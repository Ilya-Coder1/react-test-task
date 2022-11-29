import React, { useState } from 'react'
import { FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap'
import { Form } from 'react-router-dom'

function SearchForm({action = '', value = ''}) {
  const [query, setQuery] = useState(value);

  const isValid = () => {
    const [owner, repo] = query.split('/');
    return Boolean(owner && repo);
  }

  const handleSubmit = (e) => {
    if (!isValid()) {
      e.preventDefault();
    }
  }

  const handleChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  }

  return (
    <Form action={action} onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel>Введите строку поиска</FormLabel>
        <FormControl type="text" onLoad={handleChange} onChange={handleChange} name="repository" value={query}/>
        { isValid() || <FormText className="text-danger">Строка должна быть введена в виде owner/repository</FormText> }
      </FormGroup>
    </Form>
  );
}

export default SearchForm;