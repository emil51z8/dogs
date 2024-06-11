import { gql } from '@apollo/client';

export const GET_DOGS = gql`
    query GetDogs {
        dogs {
            id
            name
            breed
            owner
            dateofbirth
        }
    }`;

export const GET_DOGS_BY_ID = gql`
    query GetDogsById($id: String!) {
        dogsById(id: $id) {
            id
            name
            breed
            owner
            dateofbirth
        }
    }`;


export const CREATE_DOG = gql`
  mutation CreateDog($input: CreateDogInput!) {
    CreateDog(input: $input) {
      name
      breed
      owner
      dateofbirth
    }
  }
`;

export const DELETE_DOG = gql`
  mutation deleteDog($id: Int!) {
    deleteDog(id: $id) {
      id
      name
      breed
      owner
    }
  }
`;

export const UPDATE_DOG = gql`
  mutation($input: UpdateDogInput!){
  updateDog(input: $input) {
    name
    breed
    owner
    dateofbirth
  }
}
`;

export const GET_DOG_BY_ID = gql`
  query($getDogByIdId: Int!) {
  getDogById(id: $getDogByIdId) {
    name
    breed
    owner
    dateofbirth
  }
}
`;