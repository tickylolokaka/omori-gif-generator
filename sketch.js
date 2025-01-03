// prettier-ignore
const chars = {
  //   0          1          2           3            4           5            6        7          8                9          10         11       12           13         14
  "omori sunny": {
    names: ["01_OMORI", "01_FA_OMORI"],
    emos: [
      ["neutral", "happy",   "ecstatic", "succumbnt", "sad",      "depressed", "angry", "enraged", "closeyoureyes", "injured", "victory", "manic", "miserable", "furious"],
      ["neutral", "breathe", "stab",     "afraid",    "sidelook", "",          "angry", "",        "closeyoureyes", "injured", "victory", "",      "",          "",        "stressedout"],
    ],
  },
  Aubrey: {
    names: ["02_AUBREY", "02_FA_AUBREY"],
    emos: [
      ["neutral", "happy",   "ecstatic", "afraid",    "sad",      "depressed", "angry", "enraged", "defeated",      "injured", "victory"],
      ["neutral", "happy",   "ecstatic", "afraid",    "sad",      "depressed", "angry", "enraged", "defeated",      "injured", "victory"],
    ],
  },
  Kel: {
    names: ["03_KEL", "03_FA_KEL"],
    emos: [
      ["neutral", "happy",   "ecstatic", "afraid",    "frown",    "depressed", "angry", "enraged", "toast",         "injured", "victory"],
      ["neutral", "happy",   "ecstatic", "afraid",    "frown",    "sidelook",  "angry", "enraged", "dizzy",         "injured", "victory"],
    ],
  },
  Hero: {
    names: ["04_HERO", "04_FA_HERO"],
    emos: [
      ["neutral", "happy",   "ecstatic", "afraid",    "sad",      "depressed", "angry", "enraged", "defeated",      "injured", "victory"],
      ["neutral", "happy",   "ecstatic", "afraid",    "sad",      "depressed", "angry", "enraged", "defeated",      "injured", "victory"],
    ],
  },
};

const IMG_PATH =
  "https://raw.githubusercontent.com/tickylolokaka/omori-gif-generator/refs/heads/master/images";

const EMO_COUNT = 15;

let images = [];
let bg;

let charButtons = [],
  emoButtons = [];
let faCheck;

let chosenChar,
  chosenEmoNum = 0,
  faChecked = false;

let topText, bottomText;

let fontSizeSlider, bgSlider;

function charHasEmo(char, emoNum) {
  let chosenCharEmos = chars[char].emos[+faChecked];
  return chosenCharEmos.length > emoNum && chosenCharEmos[emoNum] != "";
}

function preload() {
  bg = loadImage(`${IMG_PATH}/bg.png`);
}

function setup() {
  createCanvas(198, 198);
  frameRate(3);
  textAlign(CENTER);
  textFont("Impact");
  fill(255);
  stroke(0);
  imageMode(CENTER);

  createElement("span", "Faraway:");
  faCheck = createCheckbox();
  faCheck.mousePressed(() => {
    faChecked = !faChecked;
    changeChar(chosenChar);
  });
  faCheck.style("display:inline");
  createElement("br");
  createElement("br");

  for (let [char, _] of Object.entries(chars)) {
    charButtons.push(createButton(char));
    charButtons[charButtons.length - 1].mousePressed(() => {
      changeChar(char);
    });
  }
  createElement("br");
  createElement("br");

  for (let i = 0; i < EMO_COUNT; i++) {
    emoButtons.push(createButton(""));
    emoButtons[emoButtons.length - 1].mousePressed(() => {
      changeEmo(i);
    });
  }
  createElement("br");
  createElement("br");

  topText = createInput("TOP TEXT");
  bottomText = createInput("BOTTOM TEXT");
  createElement("br");
  createElement("br");

  createElement("span", "Font size:");
  createElement("br");
  fontSizeSlider = createSlider(1, 100, 24);
  createElement("br");
  createElement("br");

  createElement("span", "Background:");
  createElement("br");
  bgSlider = createSlider(0, 11, 0);
  createElement("br");
  createElement("br");

  let saveButton = createButton("Save");
  saveButton.mousePressed(() => {
    saveGif("omori-gif", 3, { units: "frames" });
  });

  changeChar("omori sunny");
}

function draw() {
  push();
  translate(width / 2, height / 2);

  let bgx = -200 * (bgSlider.value() % 4) + 300;
  let bgy = -200 * floor(bgSlider.value() / 4) + 200;
  image(bg, bgx, bgy, 800, 600);

  let imgnum = frameCount % 3;
  image(images[imgnum], 0, 0, 216, 216);

  pop();

  textSize(fontSizeSlider.value());
  text(topText.value(), width / 2, fontSizeSlider.value());
  text(bottomText.value(), width / 2, height - fontSizeSlider.value() / 5);
}

function changeChar(char) {
  chosenChar = char;
  for (let i = 0; i < EMO_COUNT; i++) {
    if (charHasEmo(chosenChar, i)) {
      emoButtons[i].style("display:inline");
      emoButtons[i].html(chars[chosenChar].emos[+faChecked][i]);
    } else {
      emoButtons[i].style("display:none");
    }
  }
  if (!charHasEmo(chosenChar, chosenEmoNum)) changeEmo(0);
  else loadImages();
}

function changeEmo(emoNum) {
  chosenEmoNum = emoNum;
  loadImages();
}

function loadImages() {
  console.log(`Loading ${chosenChar} ${chosenEmoNum}`);
  let charName = chars[chosenChar].names[+faChecked];
  let emo = chars[chosenChar].emos[+faChecked][chosenEmoNum];

  if (chosenChar == "Kel") {
    if (emo == "depressed" || emo == "sidelook") emo = "sidelook-depressed";
    if (emo == "dizzy" || emo == "toast") emo = "dizzy-toast";
  }
  if (chosenChar == "omori sunny") {
    if (emo == "afraid" || emo == "succumbnt") emo = "afraid-succumbnt";
    if (emo == "breathe" || emo == "happy") emo = "breathe-happy";
    if (emo == "sad" || emo == "sidelook") emo = "sidelook-sad";
    if (emo == "stab" || emo == "ecstatic") emo = "stab-ecstatic";
  }

  for (let i = 0; i < 3; i++) {
    images[i] = loadImage(
      `${IMG_PATH}/${chosenChar}/${emo}/${charName}_BATTLE-${i}_${chosenEmoNum}.png`
    );
  }
}
