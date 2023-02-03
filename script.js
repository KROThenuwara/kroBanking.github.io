'use strict';

const dollarToRs = 1;
const loadingdots = `<span class="Loading"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>`;

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display Summery
  calcDisplaySummary(acc);

  // Display balance
  calcBalance(acc.movements);

  // Restart timer
  timeOutLogout();
};

// Data
const barry = {
  owner: 'Barry Allen',
  userName: 'barry',
  movements: [34800, 78300, -69600, 5200, -113100, -22620, 12180, 226200],
  interestRate: 1.2, // %
  pin: 1111,
  movementDates: [
    '2019-04-01T10:13:34.000Z',
    '2019-07-20T22:54:03.000Z',
    '2019-09-18T07:25:16.000Z',
    '2022-02-10T13:36:17.000Z',
    '2022-05-14T09:18:54.000Z',
    '2022-07-24T03:19:17.000Z',
    '2022-09-13T23:53:20.000Z',
    '2022-12-31T03:40:00.000Z',
  ],
};

const cisco = {
  owner: 'Francisco Ramon',
  userName: 'cisco',
  movements: [
    870000,
    591600,
    -26100,
    -137460,
    -558540,
    -174000,
    1479000,
    -5220,
  ],
  interestRate: 1.5,
  pin: 2222,
  movementDates: [
    '2019-03-01T10:13:34.000Z',
    '2019-09-20T22:54:03.000Z',
    '2019-011-18T07:25:16.000Z',
    '2022-02-10T13:36:17.000Z',
    '2022-04-14T12:45:44.000Z',
    '2022-05-14T09:18:54.000Z',
    '2022-07-19T11:31:43.000Z',
    '2022-09-08T12:50:24.000Z',
  ],
};

const volly = {
  owner: 'Volly West',
  userName: 'volly',
  movements: [34800, -34800, 59150, -52200, -3480, 8700, 69000, -80040],
  interestRate: 0.7,
  pin: 3333,
  movementDates: [
    '2019-08-01T13:13:34.000Z',
    '2019-010-20T12:54:03.000Z',
    '2019-11-18T17:25:16.000Z',
    '2022-01-02T11:08:23.000Z',
    '2022-05-08T05:51:16.000Z',
    '2022-07-24T03:19:17.000Z',
    '2022-09-13T23:53:20.000Z',
    '2023-01-30T18:30:00.000Z',
  ],
};

const accounts = [barry, cisco, volly];

// Elements
const windowTerm = document.querySelector('.termsNconditonWindow');
const errMsg = document.querySelector('.errmsg');
const invalidInputErrWindow = document.querySelector('.invalidInputErrMsgs');
const errMsgText = document.querySelector('.msgText');
const otherMsg = document.querySelector('.otherMsg');
const otherMsgText = document.querySelector('.otherMsgText');
const pinMsg = document.querySelector('.pin__msg');
const signInWindow = document.querySelector('.sign__up');
const startingDeposit = document.querySelector('#sign_up_deposit');

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelMovement = document.querySelector('.movements');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelTerms = document.querySelector('.termsnconditions');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnCloseTerm = document.querySelector('.btn__closeWindow');
const btnCloseErrmsg = document.querySelector('.msgClose');
const btnSignIn = document.querySelector('.confirm__signup');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const inputSinginFullName = document.querySelector('#sign_up_fullName');
const inputSinginUserName = document.querySelector('#sign_up_userName');
const inputSinginpin = document.querySelector('#sign_up_pin');

const showAppDetails = function () {
  containerApp.style.opacity = 1;
  containerApp.classList.remove('inactive');
};

const hideAppDetails = function () {
  containerApp.style.opacity = 0.3;
  containerApp.classList.add('inactive');
};

const displayErrmsg = function () {
  invalidInputErrWindow.style.display = 'block';
};

// currentAccount = accounts.find(
//   acc => acc.userName === inputLoginUsername.value
// );

let sameUser;

containerApp.style.display = 'none';

const startUpMsg = btnSignIn.addEventListener('click', function (e) {
  e.preventDefault();
  const email = inputSinginFullName.value;
  const emailContent = email.split('');
  console.log(emailContent.includes('@'));

  sameUser = accounts.find(acc => acc.userName === inputSinginUserName.value);

  if (!inputSinginUserName.value) {
    inputSinginUserName.style.borderColor = 'red';
  } else if (!inputSinginFullName.value || !emailContent.includes('@')) {
    inputSinginFullName.style.borderColor = 'red';
  } else if (
    !inputSinginpin ||
    !(String(inputSinginpin.value).length === 4) ||
    !typeof inputSinginpin.value === 'number'
  ) {
    inputSinginpin.style.borderColor = 'red';
    pinMsg.style.color = 'red';
  } else if (sameUser) {
    console.log('errr');
    errMsgText.textContent =
      'The userName alredy exist. Please try a different userName';
    invalidInputErrWindow.style.display = 'block';

    inputSinginFullName.value = inputSinginUserName.value = inputSinginpin.value = startingDeposit.value =
      '';
    inputSinginFullName.blur();
    inputSinginUserName.blur();
    inputSinginpin.blur();
  } else if (Number(startingDeposit.value) < 2500) {
    errMsgText.textContent =
      'Sorry, The start up deposit can not be less than 2500Rs';
    invalidInputErrWindow.style.display = 'block';
  } else {
    inputSinginFullName.style.borderColor = 'white';
    inputSinginUserName.style.borderColor = 'white';
    inputSinginpin.style.borderColor = 'white';

    otherMsg.textContent = `Creating new account. Please wait`;
    console.log('logging');
    otherMsg.insertAdjacentHTML('beforeend', loadingdots);
    otherMsg.style.display = 'block';

    setTimeout(() => {
      otherMsg.style.display = 'none';
      const fullname = inputSinginUserName.value;

      inputSinginFullName.value = inputSinginUserName.value = inputSinginpin.value = startingDeposit.value =
        '';

      signInWindow.style.display = 'none';
      currentAccount = accounts[accounts.length - 1];
      containerApp.style.display = 'grid';
      containerApp.style.opacity = 1;
      updateUI(currentAccount);

      labelWelcome.textContent = `Welcome ${fullname}`;
    }, 3000);
    let newAccount = accounts[accounts.length];

    newAccount = {
      owner: inputSinginFullName.value,
      userName: `${inputSinginUserName.value}`,
      movements: [Number(startingDeposit.value) / dollarToRs],
      movementDates: [new Date().toISOString()],
      interestRate: 0.7,
      pin: Number(inputSinginpin.value),
    };

    accounts.push(newAccount);
  }
});

// after sign in
// Current Date

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    mov = mov * dollarToRs;
    if (type === 'withdrawal') {
      mov = mov * -1;
    }

    let date = `${new Date(`${acc.movementDates[i]}`)}`;

    if (Math.round((new Date() - new Date(date)) / 1000 / 60 / 60 / 24) < 1) {
      date =
        'today at ' +
        new Intl.DateTimeFormat(navigator.language, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
    } else if (
      Math.round((new Date() - new Date(date)) / 1000 / 60 / 60 / 24) < 2.4
    ) {
      date =
        'yda at ' +
        new Intl.DateTimeFormat(navigator.language, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
    } else {
      date = date.slice(3, 15);
    }
    const formateMov = new Intl.NumberFormat(navigator.languages).format(mov);

    const html = `
    <div class="movements__row ${type}">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value"> ${formateMov}Rs</div>
        </div>
       `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const deposits = barry.movements.filter(function (mov) {
  return mov > 0;
});

const withdrawal = barry.movements.filter(function (mov) {
  return mov < 0;
});

const calcBalance = function (movements) {
  movements.balance = movements.reduce(function (acc, cur) {
    return acc + cur;
  });
  labelBalance.textContent = `${new Intl.NumberFormat(
    navigator.language
  ).format(movements.balance * dollarToRs)} Rs`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${new Intl.NumberFormat(navigator.language).format(
    income * dollarToRs
  )} Rs`;
  labelSumOut.textContent = `${`${new Intl.NumberFormat(
    navigator.language
  ).format(outcome * dollarToRs * -1)} Rs`} Rs`;
  labelSumInterest.textContent = `${new Intl.NumberFormat(
    navigator.language
  ).format(interest * dollarToRs)} Rs`;
};

//Event Handlers

const logoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min} : ${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      document.querySelector('.sign__up').style.display = 'block';
      labelWelcome.textContent = 'Login to get started';
    }

    time--;
  };

  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;

const timeOutLogout = function () {
  if (timer) clearInterval(timer);
  timer = logoutTimer();
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // this prevents form from submitting
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    // Display msgs
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(
      ','
    )}`;

    containerApp.style.opacity = 1;

    const now = new Date();
    const locale = navigator.language;
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);
    containerApp.style.display = 'grid';
    signInWindow.style.display = 'none';

    updateUI(currentAccount);

    // Clear input fields

    errMsg.style.display = 'none';
    errMsg.classList.remove('aniErr');
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.style.borderColor = 'white';
    inputLoginPin.style.borderColor = 'white';
  } else {
    errMsg.style.display = 'block';
    errMsg.classList.add('aniErr');
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.style.borderColor = 'red';
    inputLoginPin.style.borderColor = 'red';
  }
});

let transferTo;

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferTo = accounts.find(function (acc) {
    return acc.userName === inputTransferTo.value;
  });

  if (!transferTo) {
    displayErrmsg();
    hideAppDetails();
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  } else if (transferTo.userName === currentAccount.userName) {
    errMsgText.textContent = `Sorry, You can not transfer money to your own account. Please re-check the userName and try again`;
    displayErrmsg();
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  } else if (inputTransferAmount.value === '') {
    errMsgText.textContent = `Please enter the amount which you need to transfer`;
    displayErrmsg();
  } else if (!(Number(inputTransferAmount.value) > 0)) {
    errMsgText.textContent = `You can not transfer negative amount of money to others accounts. Please enter a amount more than 0`;
    displayErrmsg();
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  } else if (!(inputTransferAmount.value <= currentAccount.movements.balance)) {
    errMsgText.textContent = `You did not have enough balance to do this transfer. Please enter a less amount than your balance`;
    displayErrmsg();
    inputTransferAmount.value = inputTransferTo.value = '';
  } else {
    {
      otherMsg.textContent = `Your transaction is being proccesed. Please wait `;
      otherMsg.insertAdjacentHTML('beforeend', loadingdots);
      otherMsg.style.display = 'block';
      setTimeout(function () {
        otherMsg.style.display = 'none';

        setTimeout(function () {
          otherMsg.textContent = `Your transcation is completed`;
          otherMsg.style.display = 'block';
        }, 100);

        setTimeout(function () {
          otherMsg.style.display = 'none';
          currentAccount.movements.push(
            (Number(inputTransferAmount.value) / dollarToRs) * -1
          );
          transferTo.movements.push(Number(inputTransferAmount.value));
          currentAccount.movementDates.push(new Date().toISOString());
          transferTo.movementDates.push(new Date().toISOString());
          updateUI(currentAccount);
          inputTransferAmount.value = inputTransferTo.value = '';
        }, 3000);
      }, 3000);
    }
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value) / dollarToRs;

  if (!loanAmount || loanAmount < 0) {
    errMsgText.textContent = `Please enter a valid amount of money to proccess this loan`;
    displayErrmsg();
  } else if (!currentAccount.movements.some(cur => cur * 0.5 >= loanAmount)) {
    errMsgText.textContent = `You can not request a loan more than twice of your maximum deposit`;
    displayErrmsg();
    inputLoanAmount.value = '';
  } else {
    // containerMovements.insertAdjacentHTML('afterbegin', html);
    otherMsg.textContent = `Your loan is being proccesed. Please wait `;
    otherMsg.insertAdjacentHTML('beforeend', loadingdots);
    otherMsg.style.display = 'block';
    setTimeout(function () {
      otherMsg.style.display = 'none';

      setTimeout(function () {
        otherMsg.textContent = `You have successfully recieved your Loan`;
        otherMsg.style.display = 'block';
      }, 100);

      setTimeout(function () {
        otherMsg.style.display = 'none';
        currentAccount.movements.push(loanAmount);
        currentAccount.movementDates.push(new Date().toISOString());
        updateUI(currentAccount);
        inputLoanAmount.value = '';
      }, 3000);
    }, 3000);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    otherMsg.style.borderColor = 'red';
    setTimeout(function () {
      otherMsg.style.display = 'none';
      otherMsg.style.borderColor = 'green';

      inputClosePin.value = inputCloseUsername.value = '';

      signInWindow.style.display = 'block';
      containerApp.style.opacity = 0;
      containerApp.style.display = 'none';
      labelWelcome.textContent = 'KRO Banking';
    }, 2000);
  } else {
    let countDown = 119;
    let min;
    let sec;
    errMsgText.textContent = `You have entered wrong userName or pin. For security reasons this account will be locked for 02:00`;

    btnCloseErrmsg.style.display = 'none';
    invalidInputErrWindow.style.display = 'block';

    inputClosePin.value = inputCloseUsername.value = '';
    hideAppDetails;
    const lockTime = setInterval(function () {
      countDown--;
      min = String(Math.trunc(countDown / 60)).padStart(2, 0);
      sec = String(countDown % 60).padStart(2, 0);
      errMsgText.textContent = `You have entered wrong userName or pin. For security reasons this account will be locked for ${min}:${sec}`;
    }, 1000);

    setTimeout(() => {
      clearInterval(lockTime);
      btnCloseErrmsg.style.display = 'block';
      invalidInputErrWindow.style.display = 'none';
      showAppDetails();
    }, 120000);
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

labelTerms.addEventListener('click', function (e) {
  e.preventDefault();

  hideAppDetails();
  windowTerm.style.display = 'block';
  timeOutLogout();
});

btnCloseTerm.addEventListener('click', function (e) {
  e.preventDefault();

  showAppDetails();
  windowTerm.style.display = 'none';
  timeOutLogout();
});

btnCloseErrmsg.addEventListener('click', function () {
  invalidInputErrWindow.style.display = 'none';
  showAppDetails();
});
// Fake login for coding purposes

// currentAccount = barry;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// console.log(Math.max(...barry.movements));
// otherMsg.style.display = 'block';
