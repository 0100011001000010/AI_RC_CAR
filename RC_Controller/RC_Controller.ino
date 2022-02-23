#include <Servo.h>
#include <CheapStepper.h>
Servo myservo;
CheapStepper stepper (10,11,12,13);

boolean isClockwise;
int time = 0;
int timeB = 0;
int data;

void setup()

{

Serial.begin(9600);

myservo.attach(9);

myservo.write(100);

}

void loop() {
  

data = Serial.read();
time = 0;
timeB = 0;
CheckDrive();

while (data == 'r'&& time <= 400){
  isClockwise = false;
  stepper.step(isClockwise);
  time++;
  
  
}
while (data == 'l' && timeB <= 400 ){
  isClockwise = true;
  stepper.step(isClockwise);
  timeB++;
  
}

if(time == 400 || timeB == 400){
  drive();
}
}



void CheckDrive(){
  if(data == 'd'){
   myservo.write(155);
  delay(300);
  myservo.write(101);
}
}

void drive(){
   myservo.write(140);
  delay(300);
  myservo.write(101);
}






  
