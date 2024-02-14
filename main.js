let letters_container = document.querySelector(".letters");
let rname = "programming", wrong = 0, rarray, rvalue, rword, l, lg = document.querySelector(".letters-guess"), wn = 0, tr = 0, letters;
let array = Array.from("abcdefghijklmnopqrstuvwxyz");
array.forEach(letter => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(letter));
    span.className = "letter";
    letters_container.appendChild(span);
});
let words = {
    programming: ["php", "javascript", "go", "scala", "sass", "java", "html", "css", "pugjs"],
    movies: ["moana", "avtar", "avengers", "intersteller", "parasite", "coco", "up", "inception"],
    people: ["albert einstein", "hitchock", "alexander", "cleopatra", "mahatma ghandi"],
    countries: ["syria", "palestine", "yemen", "egypt", "qatar", "lebanon", "bahrain"]
};
rarray = [...words[rname]];
document.querySelector(".all").textContent = words[rname].length;
document.querySelector(".recent").textContent = wn;
changeword();
function changeword() {
    lg.innerHTML = "";
    rvalue = Math.floor(Math.random() * rarray.length);
    rword = rarray[rvalue];
    l = rarray[rvalue].split("");
    l.forEach(letter => {
        let span = document.createElement("span");
        if (letter === " ")
            span.className = "space";
        lg.appendChild(span);
        letters = document.querySelectorAll(".letters span");
    });
};
document.querySelector(".category select").onchange = function () {
    document.querySelector(".letters span").style.pointerEvents = "all";
    tr = 0;
    letters_container.style.pointerEvents = "all";
    wrong = 0;
    document.querySelector(".hangman-draw").className = "hangman-draw";
    rname = document.querySelector(".category select").value;
    rarray = [...words[rname]];
    document.querySelector(".all").textContent = words[rname].length;
    document.querySelector(".lose span").style.display = "none";
    document.querySelector(".win span").style.display = "none";
    wn = 0;
    document.querySelector(".recent").textContent = wn;
    changeword();
};
document.addEventListener("click", (e) => {
    let thestatus = false;
    if (e.target.className == "letter") {
        document.querySelector(".category select").style.pointerEvents = "none";
        e.target.classList.add("clicked");
        l.forEach((letter, index) => {
            if (letter === e.target.textContent.toLowerCase()) {
                thestatus = true;
                lg.children[index].textContent = e.target.textContent;
            };
        });
        if (thestatus) {
            document.getElementById("success").play();
            let f = 0;
            for (let i = 0; i < lg.children.length; i++) {
                if (lg.children[i].textContent === "" && !lg.children[i].classList.contains("space")) {
                    f = 1;
                    break;
                };
            };
            if (f == 0) {
                tr++;
                if (tr == 3) {
                    document.querySelector(".hangman-draw").className = "hangman-draw";
                    tr = 0;
                    wrong = 0;
                }
                removeCLicked();
                rarray.splice(rarray.indexOf(rword), 1);
                wn++;
                document.querySelector(".recent").textContent = wn;
                for (let i = 0; i < lg.children.length; i++) {
                    lg.children[i].classList.add("finish");
                };
                if (wn == document.querySelector(".all").textContent) {
                    document.querySelector(".win span").style.display = "block";
                    document.querySelector(".category select").style.pointerEvents = "all";
                    document.querySelector(".letters").style.pointerEvents = "none";
                } else {
                    setTimeout(() => {
                        for (let i = 0; i < lg.children.length; i++) {
                            lg.children[i].classList.remove("finish");
                        };
                        document.querySelector(".c").click();
                    }, 1000);
                };
            };
        } else {
            document.getElementById("fail").play();
            wrong++;
            if (wrong == 8) {
                document.querySelector(".lose span").style.display = "block";
                document.querySelector(".lose span").textContent = `Game Over The Word is ${rarray[rvalue].toUpperCase()}`;
                removeCLicked();
                letters_container.style.pointerEvents = "none";
                document.querySelector(".category select").style.pointerEvents = "all";
            };
            document.querySelector(".hangman-draw").classList.add(`wrong-${wrong}`);
        };
    };
});
function removeCLicked() {
    letters.forEach(letter => {
        letter.classList.remove("clicked");
    });
};