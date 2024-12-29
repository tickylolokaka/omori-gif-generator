const characters = {
  "omori sunny": ["01_OMORI", "01_FA_OMORI"],
  Aubrey: ["02_AUBREY", "02_FA_AUBREY"],
  Kel: ["03_KEL", "03_FA_KEL"],
  Hero: ["04_HERO", "04_FA_HERO"],
};

const emotions = {
  neutral: 0,
  happy: 1,
  breathe: 1,
  ecstatic: 2,
  stab: 2,
  afraid: 3,
  succumbnt: 3,
  sad: 4,
  frown: 4,
  depressed: 5,
  angry: 6,
  enraged: 7,
  defeated: 8,
  dizzy: 8,
  toast: 8,
  closeyoureyes: 8,
  injured: 9,
  victory: 10,
  manic: 11,
  miserable: 12,
  furious: 13,
  stressedout: 14,
};

const characterEmotions = {
  Aubrey: {
    neutral: [true, true],
    happy: [true, true],
    breathe: [false, false],
    ecstatic: [true, true],
    stab: [false, false],
    afraid: [true, true],
    succumbnt: [false, false],
    sad: [true, true],
    frown: [false, false],
    depressed: [true, true],
    angry: [true, true],
    enraged: [true, true],
    defeated: [true, true],
    dizzy: [false, false],
    toast: [false, false],
    closeyoureyes: [false, false],
    injured: [true, true],
    victory: [true, true],
    manic: [false, false],
    miserable: [false, false],
    furious: [false, false],
    stressedout: [false, false],
  },
  Hero: {
    neutral: [true, true],
    happy: [true, true],
    breathe: [false, false],
    ecstatic: [true, true],
    stab: [false, false],
    afraid: [true, true],
    succumbnt: [false, false],
    sad: [true, true],
    frown: [false, false],
    depressed: [true, true],
    angry: [true, true],
    enraged: [true, true],
    defeated: [true, true],
    dizzy: [false, false],
    toast: [false, false],
    closeyoureyes: [false, false],
    injured: [true, true],
    victory: [true, true],
    manic: [false, false],
    miserable: [false, false],
    furious: [false, false],
    stressedout: [false, false],
  },
  Kel: {
    neutral: [true, true],
    happy: [true, true],
    breathe: [false, false],
    ecstatic: [true, true],
    stab: [false, false],
    afraid: [true, true],
    succumbnt: [false, false],
    sad: [false, false],
    frown: [true, true],
    depressed: [true, true],
    angry: [true, true],
    enraged: [true, true],
    defeated: [false, false],
    dizzy: [false, true],
    toast: [true, false],
    closeyoureyes: [false, false],
    injured: [true, true],
    victory: [true, true],
    manic: [false, false],
    miserable: [false, false],
    furious: [false, false],
    stressedout: [false, false],
  },
  "omori sunny": {
    neutral: [true, true],
    happy: [true, false],
    breathe: [false, true],
    ecstatic: [true, false],
    stab: [false, true],
    afraid: [false, true],
    succumbnt: [true, false],
    sad: [true, true],
    frown: [false, false],
    depressed: [true, false],
    angry: [true, true],
    enraged: [true, false],
    defeated: [false, false],
    dizzy: [false, false],
    toast: [false, false],
    closeyoureyes: [true, true],
    injured: [true, true],
    victory: [true, true],
    manic: [true, false],
    miserable: [true, false],
    furious: [true, false],
    stressedout: [false, true],
  },
};

let images = [];

let faCheck;
let chosenName,
  chosenEmo,
  faChecked = false;

let charButtons = [],
  emoButtons = {};

let topText, bottomText;

function setup() {
  createCanvas(212, 212);
  frameRate(3);
  textAlign(CENTER);
  textFont("Impact");
  fill(255);
  stroke(0);
  textSize(24);

  createElement("span", "Faraway:");
  faCheck = createCheckbox();
  faCheck.mousePressed(() => {
    faChecked = !faChecked;
    changeChar(chosenName);
  });
  faCheck.style("display:inline");
  createElement("br");
  createElement("br");

  for (let [char, _] of Object.entries(characterEmotions)) {
    charButtons.push(createButton(char));
    charButtons[charButtons.length - 1].mousePressed(() => {
      changeChar(char);
    });
  }
  createElement("br");
  createElement("br");

  for (let [emo, _] of Object.entries(emotions)) {
    emoButtons[emo] = createButton(emo);
    emoButtons[emo].mousePressed(() => {
      changeEmo(emo);
    });
  }
  createElement("br");
  createElement("br");

  topText = createInput("TOP TEXT");
  bottomText = createInput("BOTTOM TEXT");
  createElement("br");
  createElement("br");

  let saveButton = createButton("Save");
  saveButton.mousePressed(() => {
    saveGif("omori-gif", 3, { units: "frames" });
  });

  changeChar("Aubrey");
}

function draw() {
  background(0);

  let imgnum = frameCount % 3;
  image(images[imgnum], 0, 0, width, height);

  text(topText.value(), width / 2, 24);
  text(bottomText.value(), width / 2, height - 5);
}

function changeChar(char) {
  chosenName = char;
  for (let [emo, showemo] of Object.entries(characterEmotions[char])) {
    emoButtons[emo].style(
      showemo[+faChecked] ? "display:inline" : "display:none"
    );
  }
  changeEmo("neutral");
}

function changeEmo(emo) {
  chosenEmo = emo;
  loadCharEmo(chosenName, emo);
}

function loadCharEmo(char, emo) {
  console.log(`Loading ${char} ${emo}`);
  charnames = characters[char];
  emonum = emotions[emo];

  if (char == "Kel") {
    if (emo == "depressed") emo = "sidelook-depressed";
    if (emo == "dizzy" || emo == "toast") emo = "dizzy-toast";
  }
  if (char == "omori sunny") {
    if (emo == "afraid" || emo == "succumbnt") emo = "afraid-succumbnt";
    if (emo == "breathe" || emo == "happy") emo = "breathe-happy";
    if (emo == "sad") emo = "sidelook-sad";
    if (emo == "stab" || emo == "ecstatic") emo = "stab-ecstatic";
  }

  for (let i = 0; i < 3; i++) {
    images[i] = loadImage(
      `https://raw.githubusercontent.com/Ransu-ll/Omori-Dialogue-Generator/refs/heads/master/Character%20Images/${char}/${emo}/${
        charnames[+faChecked]
      }_BATTLE-${i}_${emonum}.png`
    );
  }
}
