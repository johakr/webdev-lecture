const log = s => console.log(new Date().toLocaleTimeString(), s);

const getABottleOfTequilla = () =>
  new Promise((resolve, reject) => {
    log("GETTING A BOTTLE OF TEQUILLA (pending)");

    setTimeout(() => {
      if (Math.random() > 0.5) {
        log("GOT TEQUILLA (resolved)");
        return resolve("🥃🥃🥃");
      } else {
        log("NO TEQUILLA (rejected)");
        reject("😭😭😭");
      }
    }, 2000);
  });

const cutLemons = () =>
  new Promise((resolve, reject) => {
    log("CUTTING THE LEMONS (pending)");

    setTimeout(() => {
      if (Math.random() > 0.5) {
        log("NICE LEMON SLICES (resolved)");
        resolve("🍋🍋🍋");
      } else {
        log("WHOOPS CUT MY FINGER, ALL FLOODED WITH BLOOD (rejected)");
        reject("🤕🤕🤕");
      }
    }, 1000);
  });

document.querySelector("#boozButtonSerial").addEventListener("click", () => {
  console.log(new Date().toLocaleTimeString(), "STARTING TO GET BOOZED SERIAL");

  getABottleOfTequilla()
    .then(cutLemons)
    .then(() => log("YEAH, Tequilla Shots"))
    .catch(error => log(error));

  console.log(new Date().toLocaleTimeString(), "DOING OTHER STUFF...");
});

document.querySelector("#boozButtonParallel").addEventListener("click", () => {
  console.log(
    new Date().toLocaleTimeString(),
    "STARTING TO GET BOOZED PARALLEL"
  );

  Promise.all([getABottleOfTequilla(), cutLemons()])
    .then(() => log("YEAH, Tequilla Shots"))
    .catch(error => log(error));

  console.log(new Date().toLocaleTimeString(), "DOING OTHER STUFF...");
});
