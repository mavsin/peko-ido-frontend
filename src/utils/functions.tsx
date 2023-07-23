/**
 * Convert wallet address to be visible
 * @param walletAddress 0x5da095266ec7ec1d979f01a9d7e4ee902e0182bc
 * @param numberOfFirstLetters 6
 * @param numberOfLastLetters 4
 * @returns 0x5da0...82bc
 */
export const getVisibleWalletAddress = (
  walletAddress: string,
  numberOfFirstLetters: number = 6,
  numberOfLastLetters: number = 4
): string => {
  if (walletAddress.length <= 10) {
    return walletAddress;
  }
  return `${walletAddress.slice(
    0,
    numberOfFirstLetters
  )}...${walletAddress.slice(0 - numberOfLastLetters)}`;
};

/**
 * Get visible date and time
 * @param datetime Eg: Tue Jan 20 1970 22:21:39 GMT+0900 (Japan Standard Time)
 * @returns Eg: 
 */
export const getVisibleDateTime = (datetime: Date): string => {
  // const year = datetime.getUTCFullYear()
  // const month = datetime.getUTCMonth() + 1
  // const date = datetime.getUTCDate()
  // const hours = datetime.getUTCHours()
  // const minutes = datetime.getMinutes()
  // const seconds = datetime.getSeconds()

  // console.log('>>>>>>> year => ', year)
  // console.log('>>>>>>> month => ', month)
  // console.log('>>>>>>> date => ', date)
  // console.log('>>>>>>> hours => ', hours)
  // console.log('>>>>>>> minutes => ', minutes)
  // console.log('>>>>>>> seconds => ', seconds)


  const date = datetime.toDateString();
  const time = datetime.toTimeString();

  const _time = `${time.split(":")[0]}:${time.split(":")[1]}`;
  const _date = `${date.split(" ")[1]} ${date.split(" ")[2]}, ${date.split(" ")[3]
    }`;
  return `${_time} ${_date}`;
};