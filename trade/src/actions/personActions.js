import {
  PERSON_LOADING,
  GET_PERSON,
  GET_PERSONS,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON
} from "./types";

import {
  getPerson,
  getPersons,
  deletePerson,
  savePerson,
  updatePerson
} from "../services/personService";
import { NotificationManager } from "react-notifications";

export const setCurrentPerson = () => {
  return { type: PERSON_LOADING };
};

export const getPersonItems = () => async dispatch => {
  dispatch(setCurrentPerson());
  const { data } = await getPersons();
  dispatch({
    type: GET_PERSONS,
    payload: data
  });
};

export const getPersonItem = id => async dispatch => {
  dispatch(setCurrentPerson());
  try {
    const { data } = await getPerson(id);
    dispatch({
      type: GET_PERSON,
      payload: data
    });
  } catch (ex) {
    if (ex.response) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const addPersonItem = person => async dispatch => {
  try {
    await savePerson(person);
    dispatch({
      type: ADD_PERSON,
      payload: person
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const updatePersonItem = person => async dispatch => {
  try {
    await updatePerson(person);
    dispatch({
      type: UPDATE_PERSON,
      payload: person
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.error(ex.response.data);
    }
  }
};

export const deletePersonItem = id => async dispatch => {
  try {
    await deletePerson(id);
    dispatch({
      type: DELETE_PERSON,
      payload: id
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      NotificationManager.warning("این آیتم قبلا حذف شده است.");
    }
  }
};
