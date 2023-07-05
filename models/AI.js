class Model {
    constructor() {
      this.coefficients = [0.0660209726519282, 0.12359479564440112, -0.9142408558355729];
      this.intercept = 73.3259513211596;
    }
  
    predict(in1, in2, in3) {
      let prediction = this.intercept;
      prediction += this.coefficients[0] * in1;
      prediction += this.coefficients[1] * in2;
      prediction += this.coefficients[2] * in3;
      let P = 1 / (1 + Math.exp(-prediction));
      console.log(P);
      return P;
    }
  }
  
