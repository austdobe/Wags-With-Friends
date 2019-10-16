const helpers = {
  select: function (value, options) {
    const all = options.fn(this);
    const str = `value="${value}"`;
    const selected = `${str} selected`;
    const split = all.split(str);
    split.splice(1, 0, selected);
    const edit = split.join();
    return edit;
  }
};

module.exports = helpers;
