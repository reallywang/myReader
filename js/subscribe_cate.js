$(function() {

    $('body').on('click', 'a', function() {
        var cate = $(this).attr('cate');
        WBAPP.setWebLog('cateclick', 'subscript', '', [cate]);
        WBAPP.loadPage('subscript', this.href, this.title);
        return false;
    });
    $('.hasChild').on('click', function(e) {
        var $icon = $(this).find('icon');
        var $subCate = $(this).find('.subCate');
      if(e.target.className=='cate'){
        if ($icon.hasClass('close')) {
            $icon.removeClass('close').addClass('open');
            $subCate.show();
        } else {
            $icon.removeClass('open').addClass('close');
            $subCate.hide();
        }
      }


    });
    WBAPP.setWebLog('cateshow', 'subscript');
});