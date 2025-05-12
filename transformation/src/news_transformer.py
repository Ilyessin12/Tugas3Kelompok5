import os
import json
import logging
import requests
from dotenv import load_dotenv
import pymongo
from datetime import datetime
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def summarize_text_with_nlpcloud(text, max_length=150):
    try:
        api_key = os.getenv("NLP_CLOUD_API_KEY")
        url = "https://api.nlpcloud.io/v1/bart-large-cnn/summarization"
        headers = {
            "Authorization": f"Token {api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "text": text,
            "size": "medium"  # Options: one-sentence, small, medium, large
        }
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            summary = response.json().get("summary_text", "")
            logger.info("Summarization completed for text: %s", text[:50])
            return summary
        elif response.status_code == 429:
            logger.warning("Rate limit exceeded, retrying in 20 seconds")
            time.sleep(20)
            return summarize_text_with_nlpcloud(text, max_length)  # Retry once
        else:
            raise Exception(f"API request failed with status {response.status_code}: {response.text}")
    except Exception as e:
        logger.error("Error in summarization: %s", str(e))
        raise

def save_checkpoint(results, part, batch_num):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        base_dir = os.path.join(current_dir, 'Batch')
        checkpoint_filename = os.path.join(base_dir, f"checkpoint_pt{part}_batch{batch_num}.json")
        os.makedirs(base_dir, exist_ok=True)
        with open(checkpoint_filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        logger.info("Checkpoint %d saved to %s", batch_num, checkpoint_filename)
        return checkpoint_filename
    except Exception as e:
        logger.error("Error saving checkpoint: %s", str(e))
        raise

def process_news_data_from_mongo(checkpoint_interval=150, start_from=0):
    try:
        load_dotenv()
        mongo_connection_string = os.getenv("MONGODB_CONNECTION_STRING")
        mongo_db_name = os.getenv("MONGODB_DATABASE_NAME")
        mongo_collection_name = os.getenv("COLLECTION_NEWS_DATA", "Data_Berita")
        
        logger.info("Connecting to MongoDB: %s, Collection: %s", mongo_db_name, mongo_collection_name)
        client = pymongo.MongoClient(mongo_connection_string)
        db = client[mongo_db_name]
        collection = db[mongo_collection_name]
        
        news_data = list(collection.find())[:1]
        total_items = len(news_data)
        logger.info("Processing %d news items from MongoDB", total_items)
        
        results = []
        batch_num = 1
        items_in_current_batch = 0
        
        for idx, item in enumerate(news_data[start_from:], start=start_from):
            news_item = {
                "Emiten": item.get("Emiten", ""),
                "Date": item.get("Date", ""),
                "Judul": item.get("Title", ""),
                "Link": item.get("Link", ""),
                "content": item.get("Content", "")
            }
            
            if news_item["content"]:
                full_text = f"{news_item['Judul']} {news_item['content']}"
                summary = summarize_text_with_nlpcloud(full_text)
                news_item["Ringkasan"] = summary
            else:
                news_item["Ringkasan"] = "Tidak ada konten berita untuk diringkas."
            
            del news_item["content"]
            results.append(news_item)
            items_in_current_batch += 1
            
            if items_in_current_batch >= checkpoint_interval:
                save_checkpoint(results, "mongo", batch_num)
                batch_num += 1
                items_in_current_batch = 0
        
        if items_in_current_batch > 0:
            save_checkpoint(results, "mongo", batch_num)
        
        logger.info("Processed %d news items", len(results))
        return results
    except Exception as e:
        logger.error("Error processing news from MongoDB: %s", str(e))
        return []

def upload_to_mongodb(data, replace_existing=False):
    try:
        connection_string = os.environ.get('MONGODB_CONNECTION_STRING')
        database_name = os.environ.get('MONGODB_DATABASE_NAME')
        collection_name = os.environ.get('COLLECTION_NEWS_SUMMARY_DATA', "Docker_Transformasi_Berita")
        
        logger.info("Connecting to MongoDB: %s", database_name)
        client = pymongo.MongoClient(connection_string)
        db = client[database_name]
        collection = db[collection_name]
        
        if replace_existing and collection_name in db.list_collection_names():
            logger.info("Dropping existing collection %s", collection_name)
            collection.drop()
        
        for item in data:
            item['uploaded_at'] = datetime.now()
        
        result = collection.insert_many(data)
        logger.info("Inserted %d documents into %s", len(result.inserted_ids), collection_name)
        client.close()
        return True, len(result.inserted_ids)
    except Exception as e:
        logger.error("Error uploading to MongoDB: %s", str(e))
        return False, 0

def transform_news():
    try:
        load_dotenv()
        logger.info("Starting news transformation")
        results = process_news_data_from_mongo(checkpoint_interval=150)
        if results:
            success, count = upload_to_mongodb(results, replace_existing=False)
            if success:
                logger.info("Successfully uploaded %d documents to MongoDB", count)
            else:
                logger.warning("Failed to upload to MongoDB")
        else:
            logger.warning("No results to upload")
        logger.info("News transformation completed")
    except Exception as e:
        logger.error("Error in transform_news: %s", str(e))

if __name__ == "__main__":
    transform_news()