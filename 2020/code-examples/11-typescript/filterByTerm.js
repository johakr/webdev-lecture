// https://www.valentinog.com/blog/typescript/

function filterByTerm(input, searchTerm) {
  if (!searchTerm) throw Error("searchTerm cannot be empty");
  if (!input.length) throw Error("inputArr cannot be empty");
  var regex = new RegExp(searchTerm, "i");
  return input.filter(function (arrayElement) {
    return arrayElement.url.match(regex);
  });
}
filterByTerm("input string", "java");
