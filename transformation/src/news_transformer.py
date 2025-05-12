import os
import json
import logging
import requests
from dotenv import load_dotenv
import pymongo
from datetime import datetime
import time
import google.generativeai as genai

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def summarize_text_with_gemini(text, max_length=150):
    try:
        # Configure Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=api_key)
        
        # Initialize model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Truncate to 500,000 characters (Gemini’s token limit is ~128,000 tokens)
        text = text[:500000]
        
        # Create prompt for concise summarization
        prompt = f"Summarize the following text in a concise paragraph (max {max_length} words):\n\n{text}"
        
        # Generate summary
        response = model.generate_content(prompt)
        summary = response.text.strip()
        
        logger.info("Summarization completed for text: %s", text[:50])
        return summary
    
    except genai.exceptions.ApiException as e:
        if "429" in str(e):
            logger.warning("Rate limit exceeded, retrying in 20 seconds")
            time.sleep(20)
            return summarize_text_with_gemini(text, max_length)
        logger.error("Gemini API error: %s", str(e))
        return "Error: Could not summarize article"
    except Exception as e:
        logger.error("Unexpected error in summarization: %s", str(e))
        return "Error: Could not summarize article"

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

def process_news_data_from_mongo():
    try:
        # Connect to MongoDB
        client = MongoClient(os.getenv("MONGODB_CONNECTION_STRING"))
        db = client["Big_Data_kel_5"]
        collection = db["Data_Berita"]
        output_collection = db["Docker_Transformasi_Berita"]
        
        logger.info("Connecting to MongoDB: %s, Collection: %s", "Big_Data_kel_5", "Data_Berita")
        
        # Fetch news data
        news_data = list(collection.find())
        logger.info("Processing %d news items from MongoDB", len(news_data))
        
        processed_data = []
        for news_item in news_data:
            if news_item.get("content"):
                full_text = f"{news_item['Judul']} {news_item['content']}"
                summary = summarize_text_with_gemini(full_text)
                news_item["Ringkasan"] = summary
                processed_data.append(news_item)
            
            # Save checkpoint every 100 articles
            if len(processed_data) >= 100:
                output_collection.insert_many(processed_data)
                logger.info("Checkpoint: Uploaded %d documents to MongoDB", len(processed_data))
                processed_data = []
        
        # Save remaining data
        if processed_data:
            output_collection.insert_many(processed_data)
            logger.info("Final: Uploaded %d documents to MongoDB", len(processed_data))
        
        logger.info("Successfully uploaded %d documents to MongoDB", len(news_data))
    
    except Exception as e:
        logger.error("Error processing news data: %s", str(e))
        raise
    finally:
        client.close()

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