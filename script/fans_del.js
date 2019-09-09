//弹出蒙版  设置开关
//打开粉丝详情页-------begin
window.showFlag = false;
function openFansDel(frame_name,win_name,fans_id) {
  window.body_h=api.pageParam.body_h;
  if (window.showFlag == false) {
    api.openFrame({
      name : 'fans_del_layout',
      url : 'fans_del_layout.html',
      rect : {
        x : 0,
        y : 0,
        w : 'auto',
        h : window.body_h
      },
      pageParam : {
        frame_name:frame_name,
        win_name:win_name,
        fans_id:fans_id,
        is_operator:api.pageParam.is_operator
      },
      bounces : false,
      bgColor : 'rgba(0,0,0,0)',
      vScrollBarEnabled : true,
      hScrollBarEnabled : true
    });
    window.showFlag = true;
  } else {
    closeFansDelLayout();
  }
}
function closeFansDelLayout() {
  api.closeFrame({
    name : 'fans_del_layout'
  });
  window.showFlag = false;
}
//打开粉丝详情页----------end
//打开收益dialog页---------begin
window.dialogFlag = false;
function openDialog(dialog_title,dialog_del) {
  window.body_h=api.pageParam.body_h;
  if (window.dialogFlag == false) {
    api.openFrame({
      name : 'dialog_slidLayout',
      url : 'dialog_slidLayout.html',
      rect : {
        x : 0,
        y : 0,
        w : 'auto',
        h : window.body_h
      },
      pageParam : {
        dialog_title:dialog_title,
        dialog_del:dialog_del
      },
      bounces : false,
      bgColor : 'rgba(0,0,0,0)',
      vScrollBarEnabled : true,
      hScrollBarEnabled : true,
      reload:true
    });
    window.dialogFlag = true;
  } else {
    closeDialogLayout();
  }
}
function closeDialogLayout() {
  api.closeFrame({
    name : 'dialog_slidLayout'
  });
  window.dialogFlag = false;
}
//打开收益dialog页-----end
