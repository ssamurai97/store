import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'
import Form from './styles/Form';

import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const  CREATE_ITEM_MUATION = gql`
  mutation CREATE_ITEM_MUATION(
      $title:String!
      $description:String!
      $price:Int!
      $image:String
      $largeImage:String
  ) {
      createItem(
          title:$title
          description:$description
          price:$price
          image:$image
          largeImage:$largeImage
      ){
          id
          title
          description
          price
          image
          largeImage
      }
  }

`;


 class CreateItem extends Component {
     state = {
         title:'heyy',
         description:'love this',
         image:'close.jpg',
         largeImage:'ll.jpg',
         price:1000,

     }
     handleChange = (e) =>{
         const {name, type, value } = e.target;
        const val = type ==='number' ? parseFloat(value) : value;
         this.setState({[name]: val})

     };

     uploadFile = async e => {
         console.log("upload...");
         const files = e.target.files;
         const data = new FormData();
         data.append('file', files[0]);
         data.append('upload_preset', 'web_training');
         const res = await fetch 
         ('https://api.cloudinary.com/v1_1/ssamurai/image/upload', {method: 'POST',
         body:data});
         const file = await res.json();
         console.log(file)
         this.setState({
             image: file.secure_url,
             largeImage:file.eager[0].secure_url,
         });

     }
  render() {
    return (
        <Mutation mutation={CREATE_ITEM_MUATION} variables={this.state} >
            {(createItem, {loading, error }) => (

      <Form onSubmit={async e => {
          //stop page from submitting
          e.preventDefault();
          //call mutation
          const res = await createItem();
          console.log(res)
          Router.push({
              pathname: '/item',
              qury:{id: res.data.createItem.id}
          })
      }}>
          <Error error={error} />
          <label htmlFor="file">
                  <input type="file" id="file" name="file"
                   placeholder="upload a file " 
                   required
                   onChange={this.uploadFile}/>
                   {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview" />}
              </label>
          <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                  Title
                  <input type="text" id="title" name="title"
                   placeholder="title" required value={this.state.title}
                   onChange={this.handleChange}/>
              </label>

              <label htmlFor="price">
                  Price
                  <input type="number" id="price" name="price"
                   placeholder="price" required value={this.state.price}
                   onChange={this.handleChange}/>
              </label>

              <label htmlFor="Description">
                  Description
                  <textarea  id="description" name="description"
                   placeholder="Enter A Description" 
                   required value={this.state.description}
                   onChange={this.handleChange}/>
              </label>
              <button type="submit">Submit</button>
          </fieldset>
      </Form>  
     )}
    </Mutation>
    );
  }
}

export default CreateItem;
export {CREATE_ITEM_MUATION};