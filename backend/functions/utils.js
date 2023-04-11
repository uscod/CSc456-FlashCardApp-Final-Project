// Function to help validate strings of certain length
//  - Will trim string before validation
exports.isStrBetween = (str, min, max) => {
  if (
    typeof min !== "number" ||
    typeof max !== "number" ||
    min < 0 ||
    min > max
  ) {
    throw new Error("Invalid values for \"min\" or \"max\".");
  }

  return (
    typeof str == "string" &&
    str.trim().length >= min &&
    str.trim().length <= max
  );
};

// Function to determine if value is a literal object (not custom objects
// such as classes)
// - Ref: https://stackoverflow.com/a/51458052
exports.isLiteralObject = (obj) => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    !!obj.constructor && // Rare case of Object.create(null)
    obj.constructor.name === "Object"
  );
};

// Function to help validate the 1st layer of keys of objects in an array
// such that it include keys in the "keys" parameter and make sure their
// values are non-empty
//  - Returns "false" to silently handle errors
exports.arrayOfObjContainKeys = (arr, keys) => {
  if (
    !Array.isArray(arr) ||
    !arr.every((entry) => this.isLiteralObject(entry))
  ) {
    throw new Error("\"arr\" parameter must be an array of objects.");
  }
  if (!Array.isArray(keys) || !keys.every((key) => typeof key === "string")) {
    throw new Error("\"keys\" parameter must be an array of strings.");
  }
  return arr.every((obj) => {
    try {
      return keys.every((key) =>
        typeof obj[key] === "string" ? !!obj[key].trim() : !!obj[key],
      );
    } catch (err) {
      return false;
    }
  });
};
