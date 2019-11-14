$(document).on('turbolinks:load', function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){

      function buildMessage(message){
        let content = message.content? `<div class = 'message__lower-info__text'>${message.content}</div>` : "";
        let imagefile = message.image.url? `<img src="${message.image.url}", class = 'lower-message__image'>` : "";
        let html =    `<div class="message" data-id="${message.id}">
                        <div class="message__upper-info">
                          <div class="message__upper-info__talker">
                          ${message.name}
                          </div>
                          <div class="message__upper-info__date">
                          ${message.date}
                          </div>
                        </div>
                      <div class="message__lower-info">
                      ${content}
                      ${imagefile}
                      </div>
                      </div>`
          return html;
      };

    $("#new_message").on("submit", function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url =  $(this).attr("action");
      $.ajax({
        type: 'POST',
        url: url, 
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        let html = buildMessage(message);
        $(".messages").append(html);
        $("form")[0].reset();
        $(".messages").animate({
          scrollTop: $(".messages")[0].scrollHeight
        });
        })
      .always(function() {
        $(".form__input--btn").removeAttr("disabled")
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました")
      })
    });

    let reloadMessages = function() {
      let last_message_id = $(".message:last").data("id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        let insertHTML = "";
        messages.forEach(function(message){
          insertHTML = buildMessage(message)
          $(".messages").append(insertHTML);
        })
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight});
        })
      .fail(function(){
        alert("メッセージ送信に失敗しました")
      });
    };
    setInterval(reloadMessages, 5000);
  };
});