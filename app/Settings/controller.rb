require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'

class SettingsController < Rho::RhoController
  include BrowserHelper
  
  def index
    @msg = @params['msg']
    render
  end

  def stop_location
    GeoLocation.turnoff
  end
  def credits
    
    render :credits
  end
  
  def show_location
    
    
    # check if we know our position   
    if !GeoLocation.known_position?
      render :action=>:show_map
      # wait till GPS receiver acquire position
      GeoLocation.set_notification( url_for(:action => :geo_callback), "",10)
  
    
    else
      WebView.execute_js("updateLocation('"+GeoLocation.latitude.to_s+"','"+GeoLocation.longitude.to_s+"','"+GeoLocation.accuracy.to_s+"')")
          
   
    
    end
  end
 
  def geo_callback
    
    if WebView.current_location !~ /Settings/
        
            GeoLocation.turnoff
            return
        end
    
    
    
    # navigate to `show_location` page if GPS receiver acquire position  
    if @params['known_position'].to_i != 0 && @params['status'] =='ok'    
     #WebView.navigate url_for(:action => :show_map) 
      WebView.execute_js("updateLocation('"+GeoLocation.latitude.to_s+"','"+GeoLocation.longitude.to_s+"','"+GeoLocation.accuracy.to_s+"')")
       
   
    end   
    # show error if timeout expired and GPS receiver didn't acquire position
    if @params['available'].to_i == 0 || @params['status'] !='ok'
 WebView.execute_js("show_gps_error()")
      # WebView.execute_js("updateLocation('40.18417669241183','44.51487958431244','50')")
            
     

     
    end
    # do nothing, still wait for location 
  end
  
  def map_settings
    
    
    render :map_settings
  end

  def do_fast_reset
    
    
    
      render  
    
  end
  

  def wait
    render :wait
  end 
 
  
  def do_do_fast_reset
    
    
    Node.delete_all()
    WebView.execute_js("update_progress('1','progressBar')")

    WebView.execute_js("update_progress('2','progressBar')")

    WebView.execute_js("update_progress('3','progressBar')") 
  
    WebView.execute_js("update_progress('4','progressBar')")
 
    WebView.execute_js("update_progress('5','progressBar')")

    WebView.execute_js("update_progress('6','progressBar')")
    WebView.execute_js("update_progress('7','progressBar')")
    WebView.execute_js("update_progress('8','progressBar')")
    WebView.execute_js("update_progress('9','progressBar')")

    WebView.execute_js("update_progress('10','progressBar')")
    progress=10
    
    file_name = File.join(Rho::RhoApplication::get_model_path('app','Settings'), 'nodes.txt')
           file = File.new(file_name,"r")
           cikl=0
    
    db = ::Rho::RHO.get_src_db('Node')
      db.start_transaction
      begin
       
       file.each_line("\n") do |row|
           
         
          col = row.split("|")
          cikl +=2
           
     
          if cikl>30
        
           progress +=1
          WebView.execute_js("update_progress('"+progress.to_s+"','progressBar')") 
           cikl=0 
   


           end 
           zoom=col[5]
           zoom=zoom.to_i
           
         
        antwort=Node.create(
           {"id" => col[0], "version" => col[1],"timestamp"=>col[2],"lat"=>col[3],"lon"=>col[4],"zoom"=>zoom,'icon'=>col[6],'title'=>col[7],'popup'=>col[8]}
         )
           
     
         break if file.lineno > 1000
       end
       
    
db.commit
 rescue
  db.rollback
 end   
       
       
       
Globals.delete_all(:conditions => {'global_alias'=>'poi_version'}) 
@setting=Globals.create(
            {"global_alias"=>"poi_version","global_value"=>"1"}
          )     
       
      
 WebView.execute_js("update_progress('100','progressBar')")
      
sleep(1)
WebView.execute_js("close_poi_reset();")
     
  
Globals.delete_all(:conditions => {'global_alias'=>'map_version'}) 
@setting=Globals.create(
            {"global_alias"=>"map_version","global_value"=>"1"}
          )
          
          
sleep(1)      
  
      
 WebView.execute_js("reset_finished();") 


    
    
    
    
    
    
end
def show_location_error
  
  render :show_location_error
end
def show_map
  
  render :show_map
end
def update_maps
  
  @map_version = Globals.find(:first, :conditions =>{"global_alias"=>"map_version"})

  
  render :update_maps
end

def update_pois
  
  
  
  
  @poi_version = Globals.find(:first, :conditions =>{"global_alias"=>"poi_version"})

  
  
  render :update_pois
  
end 

def show_tile
  
  
  
  
  db = Rho::Database.new(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles.sqlite"),"mbtiles") 
  
        @tiles = db.executeSql("SELECT tile_data FROM tiles WHERE zoom_level = "+@params['z']+" AND tile_column = "+@params['x']+" AND tile_row =  "+@params['y']+";")
      
      @output2=@tiles[0]['tile_data']

        
WebView.execute_js("console.log('"+"SELECT tile_data FROM tiles WHERE zoom_level = "+@params['z']+" AND tile_column = "+@params['x']+" AND tile_row =  "+@params['y']+";"+"')") 
 
        

      db.close
@response["headers"]["Content-Type"] = "image/png; charset=utf-8" 
render :action => 'show_tile', :layout => 'tile', :use_layout_on_ajax => false
end

def detect_connection_callback
        if @params["connectionInformation"]=="Connected"
            # the server can be reached on port 443, trigger synchronization
           
          WebView.execute_js("alert('Server is Online');")  
          
          
        else
            # the server is unavailable
          
          WebView.execute_js("alert('Seams  our server is down or  device lost connectivity.We have paused your download.Restart it when you are online again.');")  
        end
 end  

def no_internet
  
  
  render
end
def do_first_reset
  if ! Rho::Network.hasNetwork
    


    render :action=> 'no_internet' 
    
      
    
  else
    
    

    
    
    
    
    
    
  if !Rho::RhoFile.exists(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip.rhodownload"))
      
      @downloadText="Download Map"
      
      @size="0"
      
    else
      @downloadText="Continue Download Map"
      
      @file_name2 =Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip.rhodownload")       
      @size=File.size?(@file_name2)  
        
        
        @size=@size.to_i/(1024*1024)
   
      
    end



    render :action=> 'wait' 
    

  end
  
  
  
  
end
def download_file_callback
  if @params["status"] == "ok"


    finalize_map_size
    stop_timer


  else
    WebView.execute_js("console.log('Something went wrong')")    
    WebView.execute_js("console.log('"+Rho::RhoSupport.url_encode(@params['status'])+"');")
    WebView.execute_js("download_failed('"+Rho::RhoSupport.url_encode(@params['status'])+"');")
      
      
 
       
      
  end
end





def stop_timer
  Rho::System.stopTimer(url_for(:action => :wait_for_download_complete))
    
  Rho::Network.cancel(url_for(:action => :download_file_callback))
  
    
  
  
  puts "stopTimer "
end







def check_download_state
  Rho::System.startTimer(2000,url_for(:action => :wait_for_download_complete),"file")
  puts "startTimer "
end

def wait_for_download_complete
  puts "CheckTimer "
  if !Rho::RhoFile.exists(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip"))
    Rho::System.startTimer(2000,url_for(:action => :wait_for_download_complete),"file")
    @file_name =Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip.rhodownload")       
    @size=File.size?(@file_name)      
    @size=@size.to_i    
    WebView.execute_js("downloaded_size('"+@size.to_s+"')")
    WebView.execute_js("console.log('"+@size.to_s+"')")   
    WebView.execute_js("update_progress2('"+@size.to_s+"')")
    puts "Downloaded" + @size.to_s
  else
  
  end
end



def finalize_map_size
  @size2=File.size?(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")) 
  WebView.execute_js("update_progress2('"+@size2.to_s+"')")
  WebView.execute_js("console.log('Download Success. File saved')")

  @@file_name = Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")
  @@dest=   Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles.sqlite")   

  Rho::RhoFile.deleteFile(@@dest)

  Rho::System.unzipFile(@@file_name)

  Rho::RhoFile.deleteFile(@@file_name)


  WebView.execute_js("console.log('File Unzipped')")

  WebView.execute_js("console.log('File Unzipped2222222222222222')")
  WebView.execute_js("finalizeMap();")
end


def ajax_get_mbtiles
  downloadfileProps = Hash.new
          downloadfileProps["url"]='http://maps.georates.net/maps/newApp/mbtiles.zip'
          downloadfileProps["filename"] = Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")
          downloadfileProps["overwriteFile"] = false
  if Rho::Network.hasNetwork != true
    WebView.execute_js("alert('No Internet Connection')")
       
       
    
     
          
    exit 1
    
  end
  
  if (Rho::RhoFile.exists(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")) )
       
 
    
    
    @ff2=Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip");
         
         @size2=File.size?(@ff2)  
         
         @realSize=@params['mapSize'];
         
         
           if(@size2.to_i!=@realSize.to_i)
           
             WebView.execute_js("alert('File Corrupted')")
    
             Rho::RhoFile.deleteFile(@ff2)
             
           
             
            
             
           
             
             
             
            
             WebView.execute_js("console.log('Corrupted File Deleted');")
    
           else
      
             WebView.execute_js("alert('File Fully Downloaded !!!!');")
             
             finalize_map_size
                stop_timer
              exit 1
           end
    
    
    
    
    
    
    
    
    
    
    
  end
  

 
    WebView.execute_js("console.log('Download Started')")
    # Download a file to the specified filename. Be careful with the overwriteFile parameter!
    
    
    
    
    

    Rho::Network.downloadFile(downloadfileProps, url_for(:action => :download_file_callback))
      
    
  
     
       
          

    
    
  
end 

 
end
