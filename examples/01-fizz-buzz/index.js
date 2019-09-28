const log1 = document.querySelector("#log1");
const log2 = document.querySelector("#log2");
const log3 = document.querySelector("#log3");

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0) {
    log1.append("Fizz, ");
  } else if (i % 5 === 0) {
    log1.append("Buzz, ");
  } else {
    log1.append(`${i}, `);
  }
}

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0) {
    log2.insertAdjacentHTML("beforeend", '<span class="fizz">Fizz</span>');
  } else if (i % 5 === 0) {
    log2.insertAdjacentHTML("beforeend", '<span class="buzz">Buzz</span>');
  } else {
    log2.insertAdjacentHTML("beforeend", `<span>${i}</span>`);
  }
}

for (let i = 1; i <= 100; i++) {
  log3.insertAdjacentHTML("beforeend", `<span>${i}</span>`);
}
