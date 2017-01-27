import React from 'react'
import { connect } from "react-redux"

import { incrementCount, decrementCount, changeInputNum } from '../actions/countActions'
import { changeInputName, submitName } from '../actions/userActions'

import { Row, Col } from 'react-grid-system'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

@connect((store) => {
  return {
    count: store.counter.count,
    inputNum: store.counter.inputNum,
    user: store.user.user,
    inputName: store.user.inputName,
  };
})
export default class Welcome extends React.Component {


  constructor() {
    super()
    this.incrementCount = this.incrementCount.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.submitName = this.submitName.bind(this)
  }

  incrementCount() {
    this.props.dispatch(incrementCount())
  }

  decrementCount() {
    this.props.dispatch(decrementCount())
  }

  handleChange(event) {
    this.props.dispatch(changeInputNum(parseInt(event.target.value)))
  }

  handleNameChange(event) {
    this.props.dispatch(changeInputName(event.target.value))
  }

  submitName() {
    this.props.dispatch(submitName())
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8} offset={{ md: 2 }}>
            <Card>
              <CardTitle
                title={`Welcome ${this.props.user}!`}
                subtitle={`The Count is ${this.props.count}`}
              />
              <CardText>
                <TextField
                  type='number'
                  onChange={this.handleChange}
                  value={this.props.inputNum}
                />
              </CardText>
              <CardActions>
                <RaisedButton
                  label="Increment Count!"
                  primary={true}
                  onClick={this.incrementCount}
                />
                <RaisedButton
                  label="Decrement Count!"
                  secondary={true}
                  onClick={this.decrementCount}
                />
              </CardActions>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={8} offset={{ md: 2 }}>
            <Card>
              <CardText>
                <TextField
                  type='text'
                  onChange={this.handleNameChange}
                  value={this.props.inputName}
                />
              </CardText>
              <CardActions>
                <RaisedButton
                  label="Submit Name"
                  primary={true}
                  onClick={this.submitName}
                />
              </CardActions>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
