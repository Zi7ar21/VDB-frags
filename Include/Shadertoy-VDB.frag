#version 330
precision highp float;
precision highp int;
#donotrun
#buffer RGBA32F
#buffershader "Shadertoy-VDB-BufferShader.frag"
#vertex
void main(void) {
	gl_Position = gl_Vertex;
}
#endvertex

uniform int subframe;
uniform float time;
uniform vec2 pixelSize;
uniform sampler2D backbuffer;

#group Camera
uniform vec2 Center; slider[(-10,-10),(0,0),(10,10)] NotLockable
uniform float Zoom; slider[0,.1,100] NotLockable
uniform bool MouseClickedIn; checkbox[false]
uniform bool DivideByAlpha; checkbox[true]

#group Post
uniform float Exposure; slider[0.0,1.0,30.0]
uniform float Gamma; slider[0.0,1.0,5.0];

void mainImage( out vec4 fragColor, in vec2 fragCoord );

void main() {
	mainImage(gl_FragColor, gl_FragCoord.xy);
}

#define iChannel0 backbuffer
#define iTime time
#define iFrame subframe
#define iResolution vec3(1./pixelSize, 1.)
#define iMouse vec4(vec2(1,MouseClickedIn?1:-1).xxyy*(10.-Center.xyxy)/(20.*pixelSize.xyxy))

#extension GL_EXT_gpu_shader4 : enable
#extension GL_ARB_gpu_shader5 : enable
#extension GL_ARB_shader_bit_encoding : enable
