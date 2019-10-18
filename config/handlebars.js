const helpers = {
  select: function (value, options) {
    const all = options.fn(this);
    const str = `value="${value}"`;
    const selected = `${str} selected`;
    const split = all.split(str);
    split.splice(1, 0, selected);
    const edit = split.join();
    return edit;
  },
  ifEquals: function (arg1, arg2, options) {
    console.log(arg1, arg2);
    return (arg1.toLowerCase() === arg2.toLowerCase()) ? options.fn(this) : options.inverse(this);
  }
};

module.exports = helpers;
