from flask import Flask, render_template, request, jsonify
import json
import os
import build  # Import our build script

app = Flask(__name__)

# Config
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.load(f)
    return {}

def save_json(filename, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def admin_dashboard():
    return render_template('admin.html')

@app.route('/api/team', methods=['GET', 'POST'])
def handle_team():
    if request.method == 'GET':
        return jsonify(load_json('team.json'))
    
    # POST - Save and Build
    data = request.json
    save_json('team.json', data)
    
    # Re-build the static site
    try:
        build.build_team()
        return jsonify({"status": "success", "message": "Saved and Team Updated!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/news', methods=['GET', 'POST'])
def handle_news():
    if request.method == 'GET':
        return jsonify(load_json('news.json'))
    data = request.json
    save_json('news.json', data)
    build.build_news()
    return jsonify({"status": "success", "message": "Saved and News Updated!"})

@app.route('/api/software', methods=['GET', 'POST'])
def handle_software():
    if request.method == 'GET':
        return jsonify(load_json('software.json'))
    data = request.json
    save_json('software.json', data)
    build.build_software()
    return jsonify({"status": "success", "message": "Saved and Software Updated!"})

@app.route('/api/positions', methods=['GET', 'POST'])
def handle_positions():
    if request.method == 'GET':
        return jsonify(load_json('positions.json'))
    data = request.json
    save_json('positions.json', data)
    build.build_positions()
    return jsonify({"status": "success", "message": "Saved and Positions Updated!"})

@app.route('/api/publications', methods=['GET', 'POST'])
def handle_publications():
    if request.method == 'GET':
        return jsonify(load_json('publications.json'))
    data = request.json
    save_json('publications.json', data)
    build.build_publications()
    return jsonify({"status": "success", "message": "Saved and Publications Updated!"})

@app.route('/api/home', methods=['GET', 'POST'])
def handle_home():
    if request.method == 'GET':
        return jsonify(load_json('home.json'))
    data = request.json
    save_json('home.json', data)
    build.build_home()
    return jsonify({"status": "success", "message": "Saved and Home updated!"})

@app.route('/api/contact', methods=['GET', 'POST'])
def handle_contact():
    if request.method == 'GET':
        return jsonify(load_json('contact.json'))
    data = request.json
    save_json('contact.json', data)
    build.build_contact()
    return jsonify({"status": "success", "message": "Saved and Contact updated!"})

@app.route('/api/build', methods=['POST'])
def handle_build_all():
    try:
        build.build_all()
        return jsonify({"status": "success", "message": "Full site rebuild complete!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    import webbrowser
    from threading import Timer

    def open_browser():
        webbrowser.open_new("http://127.0.0.1:5000")

    print("Starting Wang Lab Website Builder...")
    print("Opening browser...")
    Timer(1.5, open_browser).start()
    app.run(debug=True, port=5000)
