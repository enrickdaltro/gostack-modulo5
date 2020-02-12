import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    text-decoration: none;
    font-size: 16px;
    margin-bottom: 5px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 15px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  /* margin-top: 30px;
  border-top: 1px solid #eee; */
  list-style: none;

  li {
    display: flex;
    padding: 20px 10px;
    border-top: 1px solid #eee;

    & + li {
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
      }

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #7159c1;
        color: #fff;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      color: #999;
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;

  a {
    padding: 8px;
    margin: 0 0.25rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }

    &:nth-child(${props => props.active + 1}) {
      color: #7159c1;
    }
  }
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;

  span {
    margin: 0 20px;
  }

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    background: #7159c1;
    color: white;

    &:disabled {
      opacity: 0;
    }
  }
`;
