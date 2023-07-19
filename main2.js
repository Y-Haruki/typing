"use strict";

{
  // 変数の初期化
  let untyped = '';
  let typed = '';
  let pokename = '';
  // let pokeimgs = '';
  let score = 0;
  
  // 必要なHTML要素の取得
  const untypedfield = document.getElementById('untyped');
  const typedfield = document.getElementById('typed');
  const wrap = document.getElementById('wrap');
  const pokenamefield = document.getElementById('pokename');
  const start = document.getElementById('start');
  const pokeimgsfield = document.getElementById('pokeimgs');
  const count = document.getElementById('count');
  
  // 複数のテキストを格納する配列
  const textLists = [
    ['img_poke/naetoru.gif', 'ナエトル', 'naetoru'],
    ['img_poke/hayasigame.gif', 'ハヤシガメ', 'hayasigame'],
    ['img_poke/dodaidosu.gif', 'ドダイトス', 'dodaidosu'],
    ['img_poke/hikozaru.gif', 'ヒコザル', 'hikozaru'],
    ['img_poke/moukazaru.gif', 'モウカザル', 'moukazaru'],
    ['img_poke/goukazaru.gif', 'ゴウカザル', 'goukazaru'],
    ['img_poke/pottyama.gif', 'ポッチャマ', 'pottyama'],
    ['img_poke/pottaisi.gif', 'ポッタイシ', 'pottaisi'],
    ['img_poke/enperuto.gif', 'エンペルト', 'enperuto'],
    ['img_poke/mukkuru.gif', 'ムックル', 'mukkuru'],
    ['img_poke/mukuba-do.gif', 'ムクバード', 'mukuba-do'],
    ['img_poke/mukuho-ku.gif', 'ムクホーク', 'mukuho-ku'],
    


  ]
  // console.log(textLists[0][0]);

  // ランダムなテキストを表示
  const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;
    pokename = '';
    pokenamefield.textContent = pokename;
    // pokeimgs = '';
    // pokeimgsfield.write();

    // 配列のインデックス数からランダムな数値を精製する
    let random = Math.floor(Math.random() * textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random][2];
    untypedfield.textContent = untyped;
    pokenamefield.textContent = textLists[random][1];
    // pokeimgsfield.write('<img src ="' + textLists[random][0] + '">');
    pokeimgsfield.src = textLists[random][0];
  };
  
  
  // キー入力の判定
  const keyPress = e => {
    // console.log(e.key);

    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)) {
      wrap.classList.add('mistyped');
      // 100ms後に背景色を戻す
      setTimeout(() => {
        wrap.classList.remove('mistyped');
      }, 100);
      return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
      createText();
    }

  };
  
  // タイピングスキルのランクを判定
  const rankCheck = score => {

    // スコアの値を返す
    // return`${score}文字打てました！`;

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
      text = `あなたのランクはCです．\nBランクまであと${100 - score}文字です．`;
    } else if(score < 200) {
      text = `あなたのランクはBです．\nAランクまであと${200 - score}文字です．`;
    } else if(score < 300) {
      text = `あなたのランクはAです．\nSランクまであと${300 - score}文字です．`;
    } else if (score >= 300) {
      text = `あなたのランクはSです．\nおめでとうございます！`;
    }
  
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました\n${text}\n 【OK】 リトライ / 【キャンセル】終了`;
  };
  
  // ゲームを終了
  const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    // OKボタンをクリックされたらリロードする
    if(result == true) {
      window.location.reload();
    }
  };
  
  // カウントダウンタイマー
  const timer = () => {

    // タイマー部分のHYML要素（p要素)を取得する
    let time = count.textContent;

    const id = setInterval(() => {

      // カウントダウン
      time--;
      count.textContent = time;

      // カウントが0になったらタイマーを停止する
      if(time <= 0) {
        gameOver(id);
      }
    }, 1000);
  };
  
  // ゲームスタート時の処理
  start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();

    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
  });

  untypedfield.textContent = 'スタートボタンで開始';
  pokenamefield.textContent = '';
  // pokeimgsfield.textContent = '';





}




// 0:30
