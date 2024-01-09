export function camelToSnakeCase(input: string): string {
  return input.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

export function snakeToCamelCase(input: string): string {
  return input.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
}

export function padText(num:number, size:number): string {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

export function dateDifference(date1:Date,date2:Date){

// To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
  let Difference_In_Days =
    Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return { days:Difference_In_Days,utc:Difference_In_Time };
}