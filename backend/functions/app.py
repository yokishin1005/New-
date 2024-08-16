from flask import Flask, jsonify
from flask_cors import CORS
import random
from dotenv import load_dotenv
import os

load_dotenv()  # .env ファイルから環境変数を読み込む

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URL", "http://localhost:3000")}})

# トピックのリスト
topics = [
    '最近ハマっている趣味や活動',
    '子供の頃に憧れていた職業',
    '今まで行った中で最も印象に残っている旅行先',
    '人生で一番うれしかった褒め言葉',
    '休日によくする家事や料理',
    '最近読んで面白かった本や記事',
    '一番好きな季節とその理由',
    'ストレス解消法や気分転換の方法',
    '今欲しいと思っているもの',
    '最近見て感動した映画やドラマ',
    'よく行く地元のお気に入りの場所',
    '小さな幸せを感じる日常の瞬間',
    '今チャレンジしたいと思っていること',
    '自分の性格を動物に例えるとしたら',
    '最近始めた新しい習慣',
    '子供の頃の思い出の遊び',
    '自分にとっての「贅沢」だと感じるもの',
    '大切にしている日課や儀式',
    '最近驚いたニュースや出来事',
    '人生で一番記憶に残っている誕生日',
    '自分の名前の由来や意味',
    '得意な料理や好きな食べ物',
    '最近感謝したことや人',
    '今の仕事を選んだ理由',
    '人生で一番頑張ったと思うこと'
]

# ランダムなトピックを返すエンドポイント
@app.route('/.netlify/functions/api/topic', methods=['GET'])
def get_random_topic():
    return jsonify({'topic': random.choice(topics)})

@app.route('/.netlify/functions/api/topics', methods=['GET'])
def get_all_topics():
    return jsonify({'topics': topics})

@app.route('/.netlify/functions/api', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

if __name__ == '__main__':
    app.run(debug=True)
