import React, { Component } from "react";
import { v4 } from "uuid";

export default class GameChat extends Component {
  constructor(props) {
    super(props);
  }

  send() {
    const text = this.refs.send.value.trim();
    if (text) {
      const message = {
        id: v4(),
        text,
        timestamp: new Date().toISOString(),
      };
      this.props.onSend.bind(this)(message);
    }
    this.refs.send.value = "";
    this.refs.send.focus();
  }

  componentDidUpdate() {
    // always scroll to max on update
    this.refs.messages.scrollBy({
      top: Number.MAX_SAFE_INTEGER,
      behavior: "smooth",
    });
  }

  render() {
    const onSend = (e) => {
      e.preventDefault();
      this.send.bind(this)();
    };

    return (
      <div className="chat">
        <div className="chat_messages" ref="messages">
          {this.props.messages.map(({ id, text, me, player }) => (
            <p
              key={id}
              className={`chat_message ${me ? "chat_message_me" : ""}`}
            >
              [{me ? "You" : player.name}]: {text}
            </p>
          ))}
        </div>

        <form className="chat_controls">
          <div className="input_holder">
            <input
              type="text"
              ref="send"
              className="input"
              placeholder="Enter message"
            />
          </div>
          <button
            type="submit"
            onClick={onSend}
            onSubmit={onSend}
            className="button"
          >
            <span>
              SEND <span className="fa fa-paper-plane"></span>
            </span>
          </button>
        </form>
      </div>
    );
  }
}
