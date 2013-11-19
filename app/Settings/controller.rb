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


sleep(3)      
@file_name = File.join(Rho::RhoApplication::get_base_app_path()+'public/tiles', 'Archive.zip')
System.unzip_file(@file_name)  if File.exists?(@file_name) 
File.delete(@file_name) if File.exists?(@file_name)       

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



def do_first_reset





  render :action=> 'wait'
  
  
  
  
  
end
def download_file_callback
  if @params["status"] == "ok"





  else
    WebView.execute_js("console.log('Something went wrong')")
  end
end




def check_download_state
  Rho::System.startTimer(200,url_for(:action => :wait_for_download_complete),"file")
  puts "startTimer "
end

def wait_for_download_complete
  puts "CheckTimer "
  if !Rho::RhoFile.exists(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip"))
    Rho::System.startTimer(200,url_for(:action => :wait_for_download_complete),"file")
    @file_name =Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip.rhodownload")       
    @size=File.size?(@file_name)      
    @size=@size.to_i    
    WebView.execute_js("downloaded_size('"+@size.to_s+"')")
    WebView.execute_js("console.log('"+@size.to_s+"')")   
    WebView.execute_js("update_progress2('"+@size.to_s+"')")
    puts "Downloaded" + @size.to_s
  else
    check_map_size
  end
end


def check_map_size
  @size2=File.size?(Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")) 
  WebView.execute_js("update_progress2('"+@size2.to_s+"')")
  WebView.execute_js("console.log('Download Success. File saved')")

  @@file_name = Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")
  @@dest=   Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles.sqlite")   

  Rho::System.unzipFile(@@file_name)

  Rho::RhoFile.deleteFile(@@dest)

  Rho::RhoFile.deleteFile(@@file_name)


  WebView.execute_js("console.log('File Unzipped')")

  WebView.execute_js("console.log('File Unzipped2222222222222222')")
  WebView.execute_js("finalizeMap();")
end


def ajax_get_mbtiles
  if Rho::Network.hasNetwork
    WebView.execute_js("console.log('Download Started')")
    # Download a file to the specified filename. Be careful with the overwriteFile parameter!
    downloadfileProps = Hash.new
    downloadfileProps["url"]='http://maps.georates.net/maps/newApp/mbtiles.zip'
    downloadfileProps["filename"] = Rho::RhoFile.join(Rho::Application.userFolder, "mbtiles111111.sqlite.zip")
    downloadfileProps["overwriteFile"] = false

    Rho::Network.downloadFile(downloadfileProps, url_for(:action => :download_file_callback))
  else
    WebView.execute_js("console.log('No Internet Connection')")
  end
end 



end
