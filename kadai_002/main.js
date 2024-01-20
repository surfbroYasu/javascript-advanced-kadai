/*==
*変数の初期化
==*/
let untyped = '';
// Text will be assigned from textList
let typed = '';
// typed letters will be transfared to here 
let score = 0;
// Initial score is 0

/*===
*HTML要素の取得
===*/
const untypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeCount = document.getElementById('typecount');

// テキストストックの配列
const textList = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];


/*==
* テキストを入れ替え=>呼び出す。
*(createText)
==*/
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  // 変数の値を空にする。下）で出力
  typedField.textContent = typed;


  let random = Math.floor(Math.random()*textList.length);
  // 'random' が配列インデックス数から数字を選ぶ

  untyped = textList[random];
  // 'random'で選ばれたインデックス番号のテキストが'untyped'に代入される

  untypedField.textContent = untyped;
  // テキストコンテント(未入力)を代入された文字に差し替える。
};
createText();


/*
*キー入力(keeyPress)の判定をする
*/
const keyPress = e=> {
  // 誤タイプ時の処理ー
  if (e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    // 誤タイプ時のLチカ.1s
    setTimeout(()=>{
      wrap.classList.remove('mistyped');
      },100);
    return;
  }

  // 正タイプ時の処理
  score++;
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedField.textContent = typed;
  untypedField.textContent = untyped;
  typeCount.textContent = score;

  if (untyped === ''){
    createText();
  }
};

/*
*スコアをランク判定する
*/
const rankCheck = score => {

  let text = '';
  // スコアに応じて以下メッセージをtextに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};


/* 
*ゲーム終了
*/

const gameOver = id =>{
  typedField.textContent = '';
  untypedField.textContent = 'タイムアップ！';
  clearInterval(id);


  function myResult (){
    const result = confirm(rankCheck(score));
    if (result == true){
      window.location.reload();
    }
  } 
  setTimeout(myResult, 10);
};

/* 
*ゲーム時間をカウントダウン
*/
const timer = () => {
  let time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;
    
    if(time <= 0) {
      gameOver(id);
    }
  },1000);
};

  

/* 
*イベント処理
*/
start.addEventListener('click',()=>{
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
}
);
untypedField.textContent = 'スタートボタンで開始';
typeCount.textContent = '';