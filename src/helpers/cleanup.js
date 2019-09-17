function _camelCase(string) {
  return string.replace(
    /^.|-./g,
    (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase()
  );
}

function _basicCleanup(svg) {
  return svg
    .replace(/width="\S+"/, '')
    .replace(/height="\S+"/, '')
    .replace(/xmlns="(\S*)"/, '')
    .replace(/data-name="(.*?)"/, '')
    .replace(/([\w-]+)="/g, match => _camelCase(match))
    .replace(/\s{2,}/g, ' ')
    .replace(/xlink\:href="(\S*)"/g, 'xlinkHref="$1"')
    .replace(/xmlns\:xlink="(\S*)"/g, 'xmlnsXlink="$1"')
    .replace(/<style>(.*?)<\/style>/g, '');
}

module.exports.cleanupName = (name) => {
  return name.replace(/u[A-Z0-9]{4}-/, '');
};

module.exports.cleanupSvg = (svg, keepFillColor) => {
  const cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, ' height={height || size} width={width || size} onClick={onClick} style={style} className={className} viewBox');

  return keepFillColor
    ? cleanedSvg
    : cleanedSvg
      .replace(/fill="#?\w+"/g, '')
      .replace(/viewBox/, 'fill={color} viewBox')
      .replace(/\s{2,}/g, ' ')
      .replace(/ \>/g, '>');
};
