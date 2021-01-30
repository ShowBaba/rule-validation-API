const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const app = require("../src/server/app");

chai.use(chaiHttp);

/**
 * check validation field in data
 */
describe("POST /validate-rule", () => {
  it("should fail if validation field not in data", (done) => {
    const input = {
      rule: {
        field: "5",
        condition: "contains",
        condition_value: "rocinante",
      },
      data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field 5 is missing from data.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.be.null;
        done();
      });
  });
});

/**
 * Test condition eq
 */
describe("Condition eq: Means the field value should be equal to the condition value", () => {
  it("should pass condition (eq) when equal", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "eq",
        condition_value: 3,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 3,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });

  it("should fail condition (eq) when not equal", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "eq",
        condition_value: 5,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 4,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
});

/**
 * Test condition neq
 */
describe("Condition neq: Means the field value should not be equal to the condition value", () => {
  it("should pass condition (neq)", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "neq",
        condition_value: 3,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 5,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });

  it("should fail condition (neq) when equal", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "neq",
        condition_value: 5,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 5,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
});

/**
 * Test condition gt
 */
describe("Condition gt: Means the field value should be greater than the condition value", () => {
  it("should pass condition (gt)", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gt",
        condition_value: 4,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 8,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });

  it("should fail condition (gt) when equal", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gt",
        condition_value: 5,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 5,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
  it("should fail condition (gt) when less", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gt",
        condition_value: 12,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 5,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
});

/**
 * check condition gte
 */
describe("Condition gte: Means the field value should be greater than or equal to the condition value", () => {
  it("should pass condition (gte) when greater", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gte",
        condition_value: 4,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 8,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });

  it("should pass condition (gte) when equal", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gte",
        condition_value: 5,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 5,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });
  it("should fail condition (gte) when less", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "gt",
        condition_value: 1,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 0,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
});

/**
 * check condition contains
 */
describe("Condition contains: Means the field value should contain the condition value", () => {
  it("should pass condition (conatains) for equal type and value", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "contains",
        condition_value: 4,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: 4,
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("field dogs successfully validated.");
        expect(res.body.status).to.equal("success");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.false;
        done();
      });
  });

  it("should fail condition (contains) for different type and same value", (done) => {
    const input = {
      rule: {
        field: "dogs",
        condition: "contains",
        condition_value: 5,
      },
      data: {
        name: "Odunayo Eweniyi",
        dogs: "5",
      },
    };
    chai
      .request(app)
      .post("/validate-rule")
      .send(input)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("field dogs failed validation.");
        expect(res.body.status).to.equal("error");
        expect(res.body.data).to.not.be.null;
        expect(res.body.data.validation.error).to.be.true;
        done();
      });
  });
});
