var $tabs = $('.tabs');
var $panels = $('.panel');

/* Progressive enhancement setup */

$('.tab-panels').addClass('tab-js-active');
$tabs.attr('role', 'tablist');
$panels.attr({
  'role': 'tabpanel',
  'aria-hidden': 'true'
});
$panels.filter(':first-child').attr('aria-hidden', 'false');

$tabs.find('li').attr('role', 'presentation');
$tabs.find('a').each(function (i) {
  if (i === 0) {
    $(this).attr({
      'role': 'tab',
      'tabindex': '0',
      'aria-selected': 'true',
      'aria-controls': $(this).attr('href').replace('#', '')
    });
  } else {
    $(this).attr({
      'role': 'tab',
      'tabindex': '-1',
      'aria-selected': 'false',
      'aria-controls': $(this).attr('href').replace('#', '')
    });
  }
});

/* Click functionality */

$tabs.on('click', 'a', function (e) {
  e.preventDefault();
  var id = $(this).attr('href');

  $tabs.find('[aria-selected="true"]').attr({
    'aria-selected': false,
    'tabindex': -1
  });
  $(this).attr({
    'aria-selected': true,
    'tabindex': 0
  });

  $panels.filter('[aria-hidden="false"]').attr('aria-hidden', true);
  $(id).attr('aria-hidden', false);
});

/* Keyboard functionality */

$tabs.on('keydown', function (e) {
  switch (e.keyCode) {
    case 39: // Right
      $tabs.find('[aria-selected="true"]').parents('li').next().children('a').click().focus();
      break;
    case 37: // Left
      $tabs.find('[aria-selected="true"]').parents('li').prev().children('a').click().focus();
      break;
  }
});
