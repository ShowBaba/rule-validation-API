# **:triangular_flag_on_post: RULE-VALIDATION-API** (version 1.0.0)

![node version](https://img.shields.io/badge/node->=12.0.0-brightgreen.svg)

> The API validates inputs based on a set rules.

---

## **:package: Main tools used**

- [x] body-parser
- [x] cookie-parser
- [x] cors
- [x] express
- [x] express-validator
- [x] http-error
- [x] morgan
- [x] node-input-validator

## **:package: Testing tools used**
- [x] mocha
- [x] chai

---

## **:wrench: Developer usage**

### **Set up project**

Before cloning the repo **be sure** you have installed:

- [**NODE**](https://www.google.com/search?q=how+to+install+node) (version >=12.0.0)

Then:

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder path `git clone https://github.com/ShowBaba/rule-validation-API.git`

---

### **Installation**

In order to install the project and all dependencies, enter in the project folder and run `npm install`

---

### Start the project

```bash
npm start
```

---
---

### Start development

```bash
npm run dev
```

---

---

### Test

```bash
npm test
```

---

### Sample request
```
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}

```
---
### Sample response
```
Response: (HTTP 200)
{
  "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}

```


## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---


### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---

### **:robot: Author**

_*Samuel Shoyemi*_


---

Copyright © 2020 Samuel Shoyemi
