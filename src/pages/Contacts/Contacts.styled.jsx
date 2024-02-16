import styled from '@emotion/styled';

export const Section = styled.section`
  display: block;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const ContactsWrapper = styled.div`
  width: 400px;
  margin-bottom: 35px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px;
  margin-top: 12px;
  background-color: white;
`;

export const Message = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  cursor: pointer;
  margin-top: 15px;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  font-family: Lato, sans-serif;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease 0s;
  box-shadow: 0, 0 0 10px rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 4px 4px 5px 0px;
  outline: none;
  position: relative;
  background: #007bff;
  border: none;
  z-index: 1;

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: #2ba2cd;
    border-radius: 5px;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #fff;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }
`;
