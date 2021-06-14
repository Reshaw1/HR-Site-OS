import { DatePipe } from '@angular/common';
export class DataGridFunctions {


  public static formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DOP',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  public static CodeFilterParams = {
    filterOptions: ['contains'],
    textFormatter: function (r) {
      if (r == null) return null;
      return r
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/æ/g, 'ae')
        .replace(/ç/g, 'c')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/ñ/g, 'n')
        .replace(/[òóôõö]/g, 'o')
        .replace(/œ/g, 'oe')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ýÿ]/g, 'y');
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
  };

  public static contains (target, lookingFor) {
    return target && target.indexOf(lookingFor) >= 0;
  }

  public static DateFilterParams = {
    filterOptions: ['equals', 'inRange', 'greaterThanOrEqual', 'lessThanOrEqual'],
    defaultOption: 'equals',
    inRangeInclusive: true,
    suppressAndOrCondition: true,
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var datepipe= new DatePipe('en_US');
      var dateAsString = datepipe.transform(cellValue, 'dd-MM-yyyy');
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('-');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );

      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }

      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }

      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2000,
  };

  public static formatNumber(number) {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  public static numberFormatter(params) {
    return DataGridFunctions.formatNumber(params.value);
  }

  public static currencyFormatter(params) {
    return DataGridFunctions.formatter.format(params.value);
  }

  public static dateFormatter(params) {
    var datepipe= new DatePipe('en_US');
    var date = datepipe.transform(params.value, 'dd-MM-yyyy')
    return date
  }


}
