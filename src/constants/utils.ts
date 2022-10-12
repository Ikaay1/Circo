export const loginInputData: (
    | {
          key: string;
          name: string;
          image?: undefined;
      }
    | {
          key: string;
          name: string;
          image: string;
      }
)[] = [
    {key: '1', name: 'Username/Email'},
    {key: '2', name: 'Password', image: '/assets/Password-lock.png'},
];

export const signUpInputData: (
    | {
          key: string;
          name: string;
          placeholder: string;
          inputName: string;
          image?: undefined;
      }
    | {
          key: string;
          name: string;
          placeholder: string;
          image: string;
          inputName?: undefined;
      }
)[] = [
    {key: '1', name: 'first name', placeholder: 'Tony', inputName: 'firstName'},
    {key: '2', name: 'last name', placeholder: 'Clark', inputName: 'lastName'},
    {
        key: '3',
        name: 'username',
        placeholder: '@kngjames',
        inputName: 'userName',
    },
    {
        key: '4',
        name: 'email',
        placeholder: 'tonyclark24@gmail.com',
        inputName: 'email',
    },
    {
        key: '5',
        name: 'Password',
        placeholder: 'Tony1234',
        image: '/assets/Password-lock.png',
    },
];

export const controlInput = (
    num1: number,
    num2: number,
    isActive: boolean,
    texts: NodeListOf<HTMLParagraphElement>,
) => {
    if (!isActive) {
        texts[num1].classList.add('inactive');
        texts[num2].classList.add('inactive');
    } else {
        texts[num1].classList.remove('inactive');
        texts[num2].classList.remove('inactive');
    }
};

export const socialMediaIconsData = ['google', 'apple', 'facebook'];
