import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #ffffff;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 3px;
    }
  }
`;

export const UserInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #f6e8a6;
      }

      p {
        font-size: 18px;
        color: #f6e8a6;
        margin-top: 4px;
      }
    }
  }

  ul {
    margin-top: 30px;
    display: flex;
    list-style: none;
    align-items: center;

    li {
      & + li {
        margin-left: 80px;
      }
    }

    strong {
      display: block;
      font-size: 36px;
      color: #f6e8a6;
    }

    span {
      display: block;
      margin-top: 4px;
      color: #f6e8a6;
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
    }
  }
`;
