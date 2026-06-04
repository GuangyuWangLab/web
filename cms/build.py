import json
import os
import re
from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates', 'site')
OUTPUT_DIR = os.path.dirname(BASE_DIR) # Root of the project (make_new)

def load_data(filename):
    with open(os.path.join(DATA_DIR, filename), 'r') as f:
        return json.load(f)


def linkify(text):
    if text is None:
        return ''

    url_pattern = re.compile(r'((?:https?://|www\.)[^\s<]+)')

    def replace(match):
        url = match.group(0)
        href = url
        if href.startswith('www.'):
            href = 'http://' + href
        return f'<a class="timeline-link" href="{href}" target="_blank" rel="noopener noreferrer">Link here</a>'

    def process_plain(part):
        part = part.replace('\r\n', '\n').replace('\r', '\n')
        part = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', part)
        part = part.replace('\n', '<br>')
        return url_pattern.sub(replace, part)

    parts = re.split(r'(<[^>]*>)', text)
    processed = [process_plain(part) if not part.startswith('<') else part for part in parts]
    return Markup(''.join(processed))


def build_team():
    print("Building Team Page...")
    
    # Load Data
    data = load_data('team.json')
    
    # Load Template
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('team.html')
    
    # Render
    output = template.render(
        pi=data['pi'],
        members=data['members'],
        alumni=data['alumni']
    )
    
    # Write to file
    output_path = os.path.join(OUTPUT_DIR, 'team.html')
    with open(output_path, 'w') as f:
        f.write(output)
        
    print(f"Successfully generated: {output_path}")

def build_news():
    print("Building News Page...")
    data = load_data('news.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    env.filters['linkify'] = linkify
    template = env.get_template('news.html')
    output = template.render(news=data)
    with open(os.path.join(OUTPUT_DIR, 'news.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: news.html")

def build_software():
    print("Building Software Page...")
    data = load_data('software.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('software.html')
    output = template.render(software=data)
    with open(os.path.join(OUTPUT_DIR, 'software.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: software.html")

def build_positions():
    print("Building Open Positions Page...")
    data = load_data('positions.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('open_position.html')
    output = template.render(positions=data)
    with open(os.path.join(OUTPUT_DIR, 'open_position.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: open_position.html")

def build_publications():
    print("Building Publications Page...")
    data = load_data('publications.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('publication.html')
    output = template.render(publications=data)
    with open(os.path.join(OUTPUT_DIR, 'publication.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: publication.html")

def build_home():
    print("Building Home Page...")
    data = load_data('home.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('index.html')
    output = template.render(**data) # Unpack hero, intro, features
    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: index.html")

def build_contact():
    print("Building Contact Page...")
    data = load_data('contact.json')
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('contact.html')
    output = template.render(**data) # Unpack all keys
    with open(os.path.join(OUTPUT_DIR, 'contact.html'), 'w') as f:
        f.write(output)
    print("Successfully generated: contact.html")

def build_all():
    build_home()
    build_team()
    build_news()
    build_software()
    build_positions()
    build_publications()
    build_contact()

if __name__ == "__main__":
    build_all()
