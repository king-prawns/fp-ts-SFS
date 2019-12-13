import  React from 'react'


interface Props {
  disabled: boolean
  onClick: () => void
}

class Button extends React.Component<Props> {
  render() {
    if (!this.props.disabled) {
      this.props.onClick()
    }

    return(`<div>example</div>`)
  }
}

type PropsPowered =
  | {
      type: 'READONLY'
    }
  | {
      type: 'ENABLE'
      onClick: () => void
    }

class ButtonPowered extends React.Component<PropsPowered> {
  render() {
    switch (this.props.type) {
      case 'ENABLE' :
        this.props.onClick() // :)
      case 'READONLY':
        // You can not invoke here onClick
    }
    return(`<div>example</div>`)
  }
}