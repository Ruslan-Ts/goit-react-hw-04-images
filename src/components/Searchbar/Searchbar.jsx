import { useState } from 'react';
import {
  Container,
  Btn,
  SearchForm,
  SearchFormInput,
  BtnText,
} from './Searchbar.styled';
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!value.trim()) {
      return Notiflix.Notify.failure('Type somthing');
    }

    onSubmit(value);
    setValue('');
  };

  const handleNameChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit}>
        <Btn type="submit">
          <svg
            stroke="#000"
            fill="#000"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M448 449L301.2 300.2c20-27.9 31.9-62.2 31.9-99.2 0-93.1-74.7-168.9-166.5-168.9C74.7 32 0 107.8 0 200.9s74.7 168.9 166.5 168.9c39.8 0 76.3-14.2 105-37.9l146 148.1 30.5-31zM166.5 330.8c-70.6 0-128.1-58.3-128.1-129.9S95.9 71 166.5 71s128.1 58.3 128.1 129.9-57.4 129.9-128.1 129.9z"></path>
          </svg>
          <BtnText>Search</BtnText>
        </Btn>

        <SearchFormInput
          value={value}
          onChange={handleNameChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Container>
  );
};

// class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (!this.state.value.trim()) {
//       return Notiflix.Notify.failure('Type somthing');
//     }

//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   handleNameChange = event => {
//     this.setState({ value: event.target.value.toLowerCase() });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <Container>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <Btn type="submit">
//             <svg
//               stroke="#000"
//               fill="#000"
//               strokeWidth="0"
//               viewBox="0 0 448 512"
//               height="24px"
//               width="24px"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M448 449L301.2 300.2c20-27.9 31.9-62.2 31.9-99.2 0-93.1-74.7-168.9-166.5-168.9C74.7 32 0 107.8 0 200.9s74.7 168.9 166.5 168.9c39.8 0 76.3-14.2 105-37.9l146 148.1 30.5-31zM166.5 330.8c-70.6 0-128.1-58.3-128.1-129.9S95.9 71 166.5 71s128.1 58.3 128.1 129.9-57.4 129.9-128.1 129.9z"></path>
//             </svg>
//             <BtnText>Search</BtnText>
//           </Btn>

//           <SearchFormInput
//             value={value}
//             onChange={this.handleNameChange}
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </Container>
//     );
//   }
// }

export default Searchbar;
