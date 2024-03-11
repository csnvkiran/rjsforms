import "./App.css";
//import Form from "react-jsonschema-form";
//import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import Grid from "@mui/material/Unstable_Grid2";
import { JsonEditor } from "json-edit-react";
import Button from "@mui/material/Button";

var schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: {
      type: "string",
      title: "are you Done?",
      default: "test",
    },
  },
};

var uischema = {
  title: {
    "ui:variant": "filled",
    "ui:autofocus": true,
    "ui:placeholder":
      "emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).",
  },
  done: {
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
  },
};

var uischemareadonly = {
  title: {
    "ui:readonly": true,
    "ui:variant": "filled",
    "ui:autofocus": true,
    "ui:emptyValue": "test",
    "ui:placeholder":
      "emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).",
  },
  done: {
    "ui:readonly": true,
    "ui:emptyValue": "test",
    "ui:enableMarkdownInDescription": true,
    "ui:description":
      "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
  },
};

const schemavalidator = {};

const formData = {
  title: "data",
  done: "test",
};

const App = () => {
  const [schemaa, setSchema] = useState(schema);
  const [schemadata, setSchemaData] = useState(formData);
  const [uischemaa, setUiSchema] = useState(uischema);

  const onError = (errors) => console.log(errors);

  const onSubmit = ({ formData }, e) => {
    console.log("Data submitted: ", formData);
    setSchemaData(formData);
  };

  const onSchemaChange = ({ newData }) => {
    console.log("Data submitted: ", { newData });
    setSchema(newData);
  };

  const onUiSchemaChange = ({ newData }) => {
    console.log("Data submitted: ", { newData });
    setUiSchema(newData);
  };

  const onSchemaDataChange = ({ newData }) => {
    console.log("Data submitted: ", { newData });
    setSchemaData(newData);
  };

  const onSave = ({ formData }, e) => {
    console.log("JsonSchema: ", schemaa);
    console.log("JsonSchemaData", schemadata);
    console.log("JsonSchemaUI", uischemaa);
  };

  return (
    <div className='App'>
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <h3>JsonSchema:</h3>
            <JsonEditor data={schema} onUpdate={onSchemaChange} />
          </Grid>
          <Grid xs={6}>
            <h3>JsonSchema Validation:</h3>
            <JsonEditor data={schemavalidator} />
          </Grid>
          <Grid xs={6}>
            <h3>JsonSchema UI for Add/Edit:</h3>
            <JsonEditor data={uischemaa} onUpdate={onUiSchemaChange} />
          </Grid>
          <Grid xs={6}>
            <h3>JsonSchema Form for Add/Edit:</h3>
            <Form
              schema={schemaa}
              uiSchema={uischemaa}
              validator={validator}
              showErrorList={true}
              onError={onError}
              onSubmit={onSubmit}
              formData={schemadata}
            />
          </Grid>
          <Grid xs={6}>
            <h3>JsonSchema UI for Readonly:</h3>
            <JsonEditor data={uischema} />
          </Grid>
          <Grid xs={6}>
            <h3>JsonSchema Form for Readonly:</h3>
            <Form
              schema={schemaa}
              uiSchema={uischemareadonly}
              validator={validator}
              showErrorList={true}
              formData={schemadata}
            />
          </Grid>
        </Grid>
        <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <h3>JsonSchema Form Initial Data /Form Submit Data :</h3>
          <JsonEditor
            data={schemadata}
            style={{ with: "100%" }}
            onUpdate={onSchemaDataChange}
            rootName=''
          />
        </div>
        <br />

        <Button variant='contained' onClick={onSave}>
          Save
        </Button>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default App;
