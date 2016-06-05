/**
 * Created by Serkan on 26.05.2016.
 */
String.prototype.float = function () {
  return parseFloat(this);
}

Number.prototype.toFixedTr = function (len) {
  return this.toFixed(len).replace('.', ',');
}
