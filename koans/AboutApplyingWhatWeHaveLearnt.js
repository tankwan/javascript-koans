var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var noMush = function(ingredients) {
        var notMush = function(ingredient) {
          return ingredient !== "mushrooms";
        };
        return _(ingredients).all(notMush);
      }

      var noNutsnoMush = function(pizza) {
        return !pizza.containsNuts && noMush(pizza.ingredients);
      }

      productsICanEat = _(products).filter(noNutsnoMush);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1, 1000)).chain()
              .reduce(function(total, i){
                if (i % 3 === 0 || i % 5 === 0){ 
                  return total + i; 
                } else { 
                  return total; 
                }
              }, 0)
              .value();    /* try chaining range() and reduce() */
    
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = _(products).chain()
                          .map(function(pizza){
                            return pizza.ingredients;
                          })
                          .flatten()
                          .reduce(function(ingredientCount, ingredient) {
                            if (ingredient in ingredientCount) {
                              ingredientCount[ingredient] += 1;
                            } else {
                              ingredientCount[ingredient] = 1;
                            }
                            return ingredientCount;
                          }, ingredientCount)
                          .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it("should find the largest prime factor of a composite number", function () {
    var isfactor = function(number, i) {
      return number % i === 0;
    };

    var isprime = function(i) {
      for(var j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          return false;
        }
      }
      return true;
    };

    var findlargestprime = function(number) {
      for (var i = number - 1; i >= 2; i--) {
        if (isfactor(number, i) && isprime(i)) {
          return i;
        }
      }
      return 0;
    };

    expect(findlargestprime(255)).toBe(17);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var ispalin = function(number){
      var numstr = number.toString();
      for(var i = 0; i <= Math.floor(numstr.length/2 - 1); i++){
        if (numstr[i] !== numstr[numstr.length - 1 - i]) {
          return false;
        }
      }
      return true;
    };

    var findlargestpalin = function() {
      var largestp = 0;
      for(i = 999; i > 100; i--){
        for(j = i; j > 100; j--){
          if(ispalin(i * j)) {
            if (i * j > largestp){
              largestp = i * j;
            }
          }
        }
      }
      return largestp;
    };

    expect(findlargestpalin()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
        
    var primefacts = function(num){
      var currnum = num;
      var list = {};
      var currprime = 2;
      while (currnum > 1) {
        while (currnum % currprime === 0){
          if (!list.hasOwnProperty(currprime)){
            list[currprime] = 0;
          }
          list[currprime]++;
          currnum = currnum / currprime;
        }
        currprime++;
      }
      return list;
    };
    
    var listprimefacts = function(start, end) {
      var arroflists = [];
      for(var i = start; i <= end; i++){
        arroflists.push(primefacts(i));
      }
      return arroflists;
    };

    var combineprimefacts = function(arroflists){
      var combined = {};
      var list = {};
      for (var i = 0; i < arroflists.length; i++){
        list = arroflists[i];
        for (var prime in list){
          if(!combined.hasOwnProperty(prime)){
            combined[prime] = 0;
          }
          if(combined[prime] < list[prime]){
            combined[prime] = list[prime];
          }
        }
      }
      return combined;
    };

    var mergecombined = function(combined) {
      var total = 1;
      for (var prime in combined) {
        total = total * Math.pow(Number(prime), combined[prime]);
      }
      return total;
    }

    var merged = mergecombined(
                  combineprimefacts(
                    listprimefacts(1, 20)));      

    // console.log(merged);
    
    expect(merged).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var square = function(number) {
      return number * number;
    };

    var diff = function() {
      var sumsq = 0, summ = 0;
      for (var i = 0; i < arguments.length; i++) {
        sumsq += Math.pow(arguments[i], 2);
        summ += arguments[i];
      }
      var sqsum = Math.pow(summ, 2);
      return Math.abs(sumsq - sqsum);
    };

    expect(diff(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(2640);
  });

  it("should find the 10001st prime", function () {
    
    var findprime = function(num){
      var currnum = 2;
      var count = 0;

      var isprime = function(i) {
        for(var j = 2; j <= Math.sqrt(i); j++) {
          if (i % j === 0) {
            return false;
          }
        }
        return true;
      };
      while (count < num){
        if (isprime(currnum)){
          count++;
        }
        currnum++;
      }
      currnum--;
      return currnum;
    };
    expect(findprime(10001)).toBe(104743);
  });

});
