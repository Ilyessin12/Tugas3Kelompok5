#!/usr/bin/env python
# coding: utf-8

import os
from dotenv import load_dotenv
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, DoubleType
from pyspark.sql.functions import col, lit, coalesce

def transform_financial_reports():
    # Load Environment Variables
    load_dotenv()
    
    # Fetch MongoDB credentials and config
    mongo_connection_string = os.getenv("MONGODB_CONNECTION_STRING")
    mongo_db_name = os.getenv("MONGODB_DATABASE_NAME")
    mongo_input_collection = os.getenv("COLLECTION_FINANCIAL_REPORTS")
    mongo_output_collection = "Docker_Transformasi_Laporan_Keuangan"
    
    # Construct URIs
    mongo_input_uri = mongo_connection_string
    mongo_output_uri = mongo_connection_string
    
    if not all([mongo_connection_string, mongo_db_name, mongo_input_collection]):
        raise ValueError("One or more MongoDB environment variables are missing. Check your .env file.")
    
    print(f"Using Database: {mongo_db_name}")
    print(f"Input Collection: {mongo_input_collection}")
    print(f"Output Collection: {mongo_output_collection}")
    
    # Set up Spark with JARs
    jars_path = "."
    jars = ",".join([
        os.path.join(jars_path, "mongo-spark-connector_2.12-3.0.1.jar"),
        os.path.join(jars_path, "mongo-java-driver-3.12.10.jar")
    ])
    
    for jar_file in jars.split(','):
        if not os.path.exists(jar_file):
            print(f"Warning: JAR file not found at {jar_file}. Download it or update the path.")
    
    spark = SparkSession.builder \
        .appName("MongoDBSparkTransform") \
        .config("spark.jars", jars) \
        .config("spark.mongodb.input.uri", mongo_input_uri) \
        .config("spark.mongodb.input.database", mongo_db_name) \
        .config("spark.mongodb.input.collection", mongo_input_collection) \
        .config("spark.mongodb.output.uri", mongo_output_uri) \
        .config("spark.mongodb.output.database", mongo_db_name) \
        .config("spark.mongodb.output.collection", mongo_output_collection) \
        .getOrCreate()
    
    # Load and transform data
    spark.conf.set("spark.sql.caseSensitive", True)
    df = spark.read.format("com.mongodb.spark.sql.DefaultSource").load()
    
    schema = StructType([
        StructField("EntityName", StringType(), True),
        StructField("EntityCode", StringType(), True),
        StructField("SalesAndRevenue", DoubleType(), True),
        StructField("GrossProfit", DoubleType(), True),
        StructField("ProfitFromOperation", DoubleType(), True),
        StructField("ProfitLoss", DoubleType(), True),
        StructField("CashAndCashEquivalents", DoubleType(), True),
        StructField("Assets", DoubleType(), True),
        StructField("ShortTermBankLoans", DoubleType(), True),
        StructField("LongTermBankLoans", DoubleType(), True),
        StructField("EquityAttributableToEquityOwnersOfParentEntity", DoubleType(), True),
        StructField("NetCashFlowOp", DoubleType(), True),
        StructField("NetCashFlowInv", DoubleType(), True),
        StructField("NetCashFlowFin", DoubleType(), True)
    ])
    
    df_selected = df.withColumn("EntityName", col("xbrl_data.EntityName")) \
        .withColumn("EntityCode", col("xbrl_data.EntityCode")) \
        .withColumn("SalesAndRevenue", col("xbrl_data.SalesAndRevenue").cast(DoubleType())) \
        .withColumn("GrossProfit", col("xbrl_data.GrossProfit").cast(DoubleType())) \
        .withColumn("ProfitFromOperation", col("xbrl_data.ProfitFromOperation").cast(DoubleType())) \
        .withColumn("ProfitLoss", col("xbrl_data.ProfitLoss").cast(DoubleType())) \
        .withColumn("CashAndCashEquivalents", col("xbrl_data.CashAndCashEquivalents").cast(DoubleType())) \
        .withColumn("Assets", col("xbrl_data.Assets").cast(DoubleType())) \
        .withColumn("ShortTermBankLoans", col("xbrl_data.ShortTermBankLoans").cast(DoubleType())) \
        .withColumn("LongTermBankLoans", col("xbrl_data.LongTermBankLoans").cast(DoubleType())) \
        .withColumn("EquityAttributableToEquityOwnersOfParentEntity", 
                   col("xbrl_data.EquityAttributableToEquityOwnersOfParentEntity").cast(DoubleType())) \
        .withColumn("NetCashFlowOp", 
                   col("xbrl_data.NetCashFlowsReceivedFromUsedInOperatingActivities").cast(DoubleType())) \
        .withColumn("NetCashFlowInv", 
                   col("xbrl_data.NetCashFlowsReceivedFromUsedInInvestingActivities").cast(DoubleType())) \
        .withColumn("NetCashFlowFin", 
                   col("xbrl_data.NetCashFlowsReceivedFromUsedInFinancingActivities").cast(DoubleType()))
    
    for field in schema:
        if field.name not in df_selected.columns:
            df_selected = df_selected.withColumn(field.name, lit(None).cast(field.dataType))
    
    df_final = df_selected.select(schema.fieldNames())
    df_final = df_final.na.fill(0)
    
    # Write to MongoDB
    df_final.write \
        .format("com.mongodb.spark.sql.DefaultSource") \
        .mode("overwrite") \
        .option("ignoreNullFields", "false") \
        .save()
    
    print(f"Data successfully written to MongoDB database '{mongo_db_name}', collection '{mongo_output_collection}'")
    spark.stop()

if __name__ == "__main__":
    transform_financial_reports()