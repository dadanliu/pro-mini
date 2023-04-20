# hpy-watermark

## Props

<!-- @vuese:hpy-watermark:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|markAlign|文字文字位置（默认：左下角）可选值：左上角：topLeft、右上角：topRight、左下角：bottomLeft、右下角：bottomRight|`String`|`false`|bottomLeft|
|textAlign|设置文本的水平对齐方式，默认：start，文本在指定的位置开始。 end	文本在指定的位置结束。 center 文本的中心被放置在指定的位置。 left	文本左对齐。 right	文本右对齐。|`String`|`false`|start|
|textBaseline|设置文本的垂直对齐方式，默认：alphabetic文本基线是普通的字母基线。 top	文本基线是 em 方框的顶端。 hanging	文本基线是悬挂基线。 middle	文本基线是 em 方框的正中。 ideographic	文本基线是表意基线。 bottom	文本基线是 em 方框的底端。|`String`|`false`|alphabetic|
|fontSize|文字大小|`Number` /  `String`|`false`|40|
|fontColor|文字颜色|`String`|`false`|#FFFFFF|
|shadowColor|阴影颜色|`String`|`false`|rgba(0, 0, 0, 1.0)|
|shadowWidth|阴影边框大小|`Number` /  `String`|`false`|2|
|quality|图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理|`Number` /  `String`|`false`|1|
|fileType|目标文件的类型，只支持 'jpg' 或 'png'。默认为 'jpg'|`String`|`false`|jpg|

<!-- @vuese:hpy-watermark:props:end -->


## Events

<!-- @vuese:hpy-watermark:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|waterMark|-|-|

<!-- @vuese:hpy-watermark:events:end -->


