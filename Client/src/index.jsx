import React from "react";
import ReactDOM from "react-dom";
import InputBudgetForm from "./InputBudgetForm.jsx";
import InputTransactionForm from "./InputTransactionForm.jsx";
import MonthlyStatus from "./MonthlyStatus.jsx";
import Axios from "axios";
import { scaleLinear } from "d3-scale";
import CheckTransaction from "./CheckTransaction.jsx";
import ShowallTransaction from "./ShowallTransaction.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetForm: false,
      budget: {},
      transactionTypes: ["Mortgage & Rent","Restaurants","Gym","Shopping","Coffee Shops","Rental Car & Taxi,Public", "Transportation","Groceries","Food & Dining","Cash & ATM","ATM Fee","Fast Food","Clothing,Pharmacy"],
      totalsToDate: {},
      transactions: [],
      inputTransaction: {
<<<<<<< HEAD
        date: "",
        transactionType: "",
        category: "",
        accountName: "",
        description: "",
        amount: ""
=======
        date: '',
        transactionType: '',
        category: '',
        accountName: '',
        description: '',
        amount: ''
>>>>>>> 362815f07588caef670de0ce31527966728fd752
      },
      inputBudget: {},
      showGraph: false,
      showTransaction: false
    };
    this.handleTransactionChange = this.handleTransactionChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
    this.handleBudgetSubmit = this.handleBudgetSubmit.bind(this);
    this.getCurrentSpend = this.getCurrentSpend.bind(this);
    this.getCurrentBudget = this.getCurrentBudget.bind(this);
    this.getAllCurrentTransactions = this.getAllCurrentTransactions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNewBudgetSubmit = this.handleNewBudgetSubmit.bind(this);
    this.handleTransactionShow = this.handleTransactionShow.bind(this);
  }

  //this function handles changes in the transaction input fields
  handleTransactionChange(event) {
    let tempObj = Object.assign({}, this.state.inputTransaction);
    tempObj[event.target.name] = event.target.value;
    this.setState({
      inputTransaction: tempObj
    });
  }

  //this function handles changes in the budget input fields
  handleBudgetChange(event) {
<<<<<<< HEAD
    console.log("inside handle budget change");
=======
    console.log('inside handle budget change');
>>>>>>> 362815f07588caef670de0ce31527966728fd752
    let tempObj = Object.assign({}, this.state.inputBudget);
    tempObj[event.target.name] = event.target.value;
    this.setState({
      inputBudget: tempObj
    });
<<<<<<< HEAD
    console.log("the state is", this.state.inputBudget);
=======
    console.log('the state is', this.state.inputBudget);
>>>>>>> 362815f07588caef670de0ce31527966728fd752
  }

  //this function handles a new transaction submit
  handleTransactionSubmit() {
<<<<<<< HEAD
    Axios.post("/app/actual", this.state.inputTransaction)
      .then(
        () => this.getAllCurrentTransactions(),
        this.setState({
          showTransaction: !this.state.showTransaction,
          inputTransaction: {}
        })
      )
=======
    Axios.post('/app/actual', this.state.inputTransaction)
      .then(() => this.getAllCurrentTransactions())
>>>>>>> 362815f07588caef670de0ce31527966728fd752
      .catch(err => {
        if (err) console.log(err);
      });
  }

  //this function handles a new budget submit
  handleBudgetSubmit() {
    let newBudgetDataArray = [];
    let objectKeys = Object.keys(this.state.inputBudget);
    for (let i in this.state.inputBudget) {
<<<<<<< HEAD
      if (objectKeys[i] !== "month") {
        let eachCategoryObj = {};
        eachCategoryObj["month"] = this.state.inputBudget.month;
        eachCategoryObj["category"] = objectKeys[i];
        eachCategoryObj["amount"] = this.state.inputBudget[i];
=======
      if (objectKeys[i] !== 'month') {
        let eachCategoryObj = {};
        eachCategoryObj['month'] = this.state.inputBudget.month;
        eachCategoryObj['category'] = objectKeys[i];
        eachCategoryObj['amount'] = this.state.inputBudget[i];
>>>>>>> 362815f07588caef670de0ce31527966728fd752
        newBudgetDataArray.push(eachCategoryObj);
      }
    }

<<<<<<< HEAD
    console.log("newBudgetDataArray", newBudgetDataArray);
    Axios.post("/app/budget", this.state.inputBudget)
=======
    console.log('newBudgetDataArray', newBudgetDataArray);
    Axios.post('/app/budget', this.state.inputBudget)
>>>>>>> 362815f07588caef670de0ce31527966728fd752
      .then(() => {
        this.getCurrentBudget();
        this.setState({ budgetForm: true });
        this.getAllCurrentTransactions();
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  //this function iterates through our state transactions to calculate the current spend for each
  getCurrentSpend(catName) {
    let total = 0;
    //iterate over the current transactions
    for (let i = 0; i < this.state.transactions.length; i++) {
      //if it matches the catName, add to total
      if (this.state.transactions[i].name === catName) {
        total += this.state.transactions[i].amount;
      }
    }
    //set state equal to the new total
    this.setState({ totalsToDate: { catName: total } });
  }

  //this function gets the current budget from our database
  //will have to update for different months
  getCurrentBudget() {
    console.log("inside get current budget");
    Axios.get("/app/budget")
      .then(response => {
        console.log("data back from server is ", response.data);
        this.setState({ budget: data });
      })
      .catch(err => {
        if (err) console.log("get current budget error is", err);
      });
  }

  //this function gets all transactions from the database
  getAllCurrentTransactions() {
    console.log("inside getalltransactions");
    Axios.get("/app/actual")
      .then(response => {
        console.log("transactions from server are", response.data);
        this.setState({ transactions: response.data });
        // if (!this.state.transactionTypes.contains(data.type)) {
        //   this.
        // }
      })
      .catch(err => {
        if (err) console.log("error from getAllCurrentTransactions is", err);
      });
  }

  //once everything mounts, we pull the budget and all transactions
  componentDidMount() {
    this.getCurrentBudget();
  }
  handleNewBudgetSubmit() {
    this.setState({ budgetForm: true });
  }

  //show transaction function
  handleTransactionShow() {
    this.setState({ showTransaction: !this.state.showTransaction });
  }

  render() {
    //conditional rendering
    const budgetFormStatus = this.state.budgetForm;
    let formToBeShown;
    let createNewBudgetButton;

    if (!budgetFormStatus) {
      formToBeShown = (
        <InputBudgetForm
          transactionTypes={this.state.transactionTypes}
          handleBudgetChange={this.handleBudgetChange}
          handleBudgetSubmit={this.handleBudgetSubmit}
        />
      );
      createNewBudgetButton = (
        <button onSubmit={this.handleNewBudgetSubmit}>
          Create a new budget for this month!
        </button>
      );
    } else {
      formToBeShown = (
        <InputTransactionForm
          handleTransactionChange={this.handleTransactionChange}
          handleTransactionShow={this.handleTransactionShow}
          transactionTypes={this.state.transactionTypes}
        />
      );
    }

    return (
      <div>
        <h1 className="title w3-display-topmiddle w3-panel w3-padding-16">
          Budget
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <div className="w3-container w3-margin-bottom w3-border">
          {createNewBudgetButton}
        </div>
        <br></br>
        <div>{formToBeShown}</div>
        <br></br>
        <div>
          <MonthlyStatus
            transactionTypes={this.state.transactionTypes}
            getCurrentSpend={this.getCurrentSpend}
            budget={this.state.budget}
          />
        </div>
        <div className="w3-display-topright">
          <br></br>
          <br></br>
          <br></br>
          <div>
            {this.state.showTransaction ? (
              <CheckTransaction
                handleTransactionSubmit={this.handleTransactionSubmit}
                inputTransaction={this.state.inputTransaction}
                handleTransactionShow={this.handleTransactionShow}
              />
            ) : null}
          </div>
        </div>
        <div>
          <button className="button is-success is-medium is-rounded w3-display-bottomleft">
            Show Graph
          </button>
        </div>
        <div className="w3-display-topmiddle">
          <br></br>
          <br></br>
          <br></br>
          <ShowallTransaction transactions={this.state.transactions} />
        </div>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
