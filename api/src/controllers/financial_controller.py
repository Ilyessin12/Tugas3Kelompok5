from flask import Blueprint, jsonify
from src.services import mongodb_service

financial_bp = Blueprint('financial_bp', __name__)

@financial_bp.route('/financial/<string:emiten>', methods=['GET'])
def get_financial_report(emiten):
    """
    API endpoint to get financial report data for a specific emiten.
    """
    # Ensure DB connection
    if mongodb_service.financial_report_collection is None:
        mongodb_service.connect_db()
        if mongodb_service.financial_report_collection is None:
            return jsonify({"error": "Database connection failed"}), 500
    
    data = mongodb_service.get_financial_report_data(emiten.upper())
    
    if data is None:
        return jsonify({"message": f"No financial report found for emiten {emiten}"}), 404
    else:
        return jsonify(data)