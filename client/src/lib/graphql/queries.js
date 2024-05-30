import { gql } from '@apollo/client';

export const GET_DOGS = gql`
    query GetDogs {
        dogs {
            id
            name
            race
            owner
        }
    }`;

export const GET_DOGS_BY_ID = gql`
    query GetDogsById($id: String!) {
        dogsById(id: $id) {
            id
            name
            race
            owner
        }
    }`;


export const CREATE_DOG = gql`
  mutation CreateDog($input: CreateDogInput!) {
    CreateDog(input: $input) {
      name
      race
      owner
    }
  }
`;