from flask import Blueprint, jsonify, request
from src.services import mongodb_service

news_bp = Blueprint('news_bp', __name__)

@news_bp.route('/news/<string:emiten>', methods=['GET'])
def get_news(emiten):
    """
    API endpoint to get news data for a specific emiten.
    Accepts 'limit' and 'skip' query parameters for pagination.
    """
    try:
        limit = int(request.args.get('limit', 20))
        skip = int(request.args.get('skip', 0))
    except ValueError:
        return jsonify({"error": "Invalid limit or skip parameter. Must be integers."}), 400
    
    # Ensure DB connection
    if mongodb_service.news_collection is None:
        mongodb_service.connect_db()
        if mongodb_service.news_collection is None:
            return jsonify({"error": "Database connection failed"}), 500
    
    data = mongodb_service.get_news_data(emiten.upper(), limit, skip)
    
    if data is None:
        return jsonify({"error": "Failed to retrieve news data"}), 500
    elif not data:
        return jsonify({"message": f"No news found for emiten {emiten}"}), 404
    else:
        return jsonify(data)

@news_bp.route('/news/summary/<string:emiten>', methods=['GET'])
def get_news_summary(emiten):
    """
    API endpoint to get summarized news data for a specific emiten.
    Accepts 'limit' and 'skip' query parameters for pagination.
    """
    try:
        limit = int(request.args.get('limit', 20))
        skip = int(request.args.get('skip', 0))
    except ValueError:
        return jsonify({"error": "Invalid limit or skip parameter. Must be integers."}), 400
    
    # Ensure DB connection
    if mongodb_service.news_summary_collection is None:
        mongodb_service.connect_db()
        if mongodb_service.news_summary_collection is None:
            return jsonify({"error": "Database connection failed"}), 500
    
    data = mongodb_service.get_news_summary_data(emiten.upper(), limit, skip)
    
    if data is None:
        return jsonify({"error": "Failed to retrieve news summary data"}), 500
    elif not data:
        return jsonify({"message": f"No news summaries found for emiten {emiten}"}), 404
    else:
        return jsonify(data)
