import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from "react-bootstrap";
import "./Compose.css";
import { EditorState } from "draft-js";
//import axios from 'axios';

const MainMail = () => {
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  //console.log(editorState);
  const toEmail = useRef("");
  const subject = useRef("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(toEmail, subject);
    const toEmailInbox = toEmail.current.value.replace(/[@.]/g, "");
    const fromEmail = localStorage.getItem("email").replace(/[@.]/g, "");

    // console.log("to email", toEmailInbox);
    // console.log("from email", fromEmail);
    const message = {
      to: toEmail.current.value,
      from: localStorage.getItem("email"),
      subject: subject.current.value,
      message: editorState.getCurrentContent().getPlainText(),
      date: new Date().toLocaleDateString(),
    };

    const response = await fetch(
      `https://react-a03c1-default-rtdb.firebaseio.com/${toEmailInbox}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify(message),
      }
    );

    if (response.ok) {
      toEmail.current.value = "";
      subject.current.value = "";
    } else {
      console.log("error ocurred ");
    }

    const responsee = await fetch(
      `https://react-a03c1-default-rtdb.firebaseio.com/${fromEmail}/sentbox.json`,
      {
        method: "POST",
        body: JSON.stringify(message),
      }
    );

    if (responsee.ok) {
      toEmail.current.value = "";
      subject.current.value = "";
    } else {
      console.log("error ocurred ");
    }
  };

  return (
    <div>
      <form className="composemail" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>To</Form.Label>
          <Form.Control type="email" ref={toEmail} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" ref={subject} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTextArea">
          <Editor
            placeholder="Enter message"
            editorState={editorState}
            onEditorStateChange={setEditor}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
export default MainMail;
