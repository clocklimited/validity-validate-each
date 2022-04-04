var assert = require("assert-diff"),
  required = require("@clocklimited/validity").required,
  createValidator = require("..");

describe("Validity Validate Each", function () {
  it("should apply a given validator to each value of an array", function (done) {
    var obj = { test: [1, 2, "", null, 5] },
      validateEach = createValidator(required);

    validateEach("test", "Test Property", obj, function (err, msgs) {
      assert.deepEqual(msgs, {
        2: "Test Property is required",
        3: "Test Property is required",
      });
      done();
    });
  });

  it("should validate a list of invalid entries", function (done) {
    var obj = { test: [undefined, "", null] },
      validateEach = createValidator(required);

    validateEach("test", "Test Property", obj, function (err, msgs) {
      assert.deepEqual(msgs, {
        0: "Test Property is required",
        1: "Test Property is required",
        2: "Test Property is required",
      });
      done();
    });
  });

  it("should not return errors if the requested property does not exist", function (done) {
    var obj = {},
      validateEach = createValidator(required);

    validateEach("test", "Test Property", obj, function (err, msgs) {
      assert(!msgs);
      done();
    });
  });

  it("should not return errors if the requested property is an empty array", function (done) {
    var obj = { test: [] },
      validateEach = createValidator(required);

    validateEach("test", "Test Property", obj, function (err, msgs) {
      assert(!msgs);
      done();
    });
  });
});
